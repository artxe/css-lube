import { readFileSync } from "node:fs"

/**
 * 유일한 스텁 경계.
 *
 * click-css.js 는 손대지 않고 원문 그대로 실행한다. MutationObserver 스텁이
 * 라이브러리가 등록한 콜백 두 개를 잡아두므로, 실제 진입점으로 클래스를
 * 밀어넣고 실제 `<style>` 에 쓰인 결과를 읽는 방식으로 검증한다.
 * 내부 함수를 꺼내기 위한 소스 주입이 없다는 뜻이다.
 */

/**
 * CSS.escape — Node 에 없어서 스펙대로 다시 쓴 유일한 부분.
 * 셀렉터 문자열 단언은 딱 이 구현만큼만 신뢰할 수 있다. 선언부 단언은 무관하다.
 * @param {string} value
 * @returns {string}
 */
export const escape = value => {
	const s = String(value)
	let out = ""
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i)
		if (c === 0) {
			out += "�"
		} else if (
			(c >= 0x1 && c <= 0x1f) || c === 0x7f
			|| (i === 0 && c >= 0x30 && c <= 0x39)
			|| (i === 1 && c >= 0x30 && c <= 0x39 && s.charCodeAt(0) === 0x2d)
		) {
			out += "\\" + c.toString(16) + " "
		} else if (i === 0 && c === 0x2d && s.length === 1) {
			out += "\\" + s[i]
		} else if (
			c >= 0x80 || c === 0x2d || c === 0x5f
			|| (c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a)
		) {
			out += s[i]
		} else {
			out += "\\" + s[i]
		}
	}
	return out
}

/**
 * 브라우저가 class 속성을 직렬화할 때 이스케이프하는 다섯 가지.
 * @param {string} text
 * @returns {string}
 */
export const serialize_attribute = text => text
	.replace(/&/g, "&amp;")
	.replace(/ /g, "&nbsp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;")

/**
 * 셀렉터 안의 `\{` 는 건너뛰고 블록을 여는 `{` 의 위치를 찾는다.
 * @param {string} css
 * @returns {number}
 */
const find_brace = css => {
	for (let i = 0; i < css.length; i++) {
		if (css[i] == "\\") i++
		else if (css[i] == "{") return i
	}
	return -1
}

/**
 * 규칙의 선언부만 뽑는다. at-rule 이면 한 겹 더 들어간다.
 * @param {string} css
 * @returns {string}
 */
export const declarations = css => {
	let out = css
	for (let depth = css[0] == "@" ? 2 : 1; depth--;) {
		const i = find_brace(out)
		if (i < 0) return ""
		out = out.slice(i + 1, out.lastIndexOf("}"))
	}
	return out
}

/**
 * at-rule 프렐류드 (`@media (min-width:640px)` 같은 첫 `{` 앞부분).
 * @param {string} css
 * @returns {string}
 */
export const prelude = css => css[0] == "@" ? css.slice(0, find_brace(css)).trim() : ""

const default_source = readFileSync(
	new URL("../lib/click-css.js", import.meta.url),
	"utf8"
)

/**
 * @typedef {object} Instance
 * @property {(...names: string[]) => string} via_class_list
 *   class 속성 변경 경로 — classList 를 직접 순회한다
 * @property {(...names: string[]) => string} via_outer_html
 *   초기 파싱 경로 — outerHTML 직렬화 후 정규식으로 뽑는다
 * @property {string} reset 클래스가 하나도 없을 때의 시트 (기준선)
 * @property {(theme?: string) => string} rebuild THEME 을 바꾸고 시트를 다시 만든다
 */

/**
 * click-css 를 스텁 DOM 위에 새로 띄운다.
 * @param {string} [source] 기본값은 packages/lib/click-css.js
 * @returns {Instance}
 */
export const load = (source = default_source) => {
	const style = { textContent: "", setAttribute() {} }
	/** @type {((records: object[]) => void)[]} */
	const observers = []
	let theme = /** @type {string | null} */(null)/**/
	Object.assign(
		globalThis,
		/** @type {any} */({
			CSS: { escape },
			document: {
				createElement: () => style,
				documentElement: {},
				head: { append() {} }
			},
			localStorage: { getItem: () => theme },
			MutationObserver: class {
				/** @param {(records: object[]) => void} callback */
				constructor(callback) { observers.push(callback) }
				observe() {}
			}
		})
	)
	new Function(source)()
	// 세미콜론 없는 스타일이라 다음 줄을 `(` 로 시작하면 위 호출에 이어붙는다
	const build = /** @type {() => void} */(/** @type {any} */(globalThis).click)/**/
	build()
	const reset = style.textContent
	const added = () => style.textContent.slice(reset.length)
	const on_attribute = /** @type {(records: object[]) => void} */(observers[0])/**/
	const on_child_list = /** @type {(records: object[]) => void} */(observers[1])/**/
	return {
		reset,
		via_class_list: (...names) => {
			on_attribute([ { target: { nodeType: 1, classList: names } } ])
			return added()
		},
		via_outer_html: (...names) => {
			const attribute = serialize_attribute(names.join(" "))
			on_child_list(
				[
					{
						target: {
							nodeType: 1,
							outerHTML: `<div class="${attribute}"></div>`,
							contains: () => false
						}
					}
				]
			)
			return added()
		},
		rebuild: next => {
			theme = next ?? null
			build()
			return style.textContent
		}
	}
}

/**
 * 같은 클래스를 두 수집 경로로 각각 흘려보내고, 결과가 같으면 그 값을 돌려준다.
 * 다르면 예외 — 두 경로가 갈라지는 것 자체가 버그다.
 * @param {...string} names
 * @returns {string}
 */
export const compile = (...names) => {
	const a = load().via_class_list(...names)
	const b = load().via_outer_html(...names)
	if (a !== b) {
		throw Error(
			"수집 경로가 갈라졌다\n  classList: " + JSON.stringify(a)
			+ "\n  outerHTML: " + JSON.stringify(b)
		)
	}
	return a
}
