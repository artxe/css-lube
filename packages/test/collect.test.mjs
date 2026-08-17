import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { load, serialize_attribute } from "./dom.mjs"

/**
 * 클래스는 두 경로로 수집된다.
 *
 * - class 속성 변경 → `classList` 를 직접 순회 (DOM 이 준 원문 그대로)
 * - 초기 파싱 / 서브트리 추가 → `outerHTML` 직렬화 후 정규식
 *
 * 직렬화는 속성값의 `&`, `<`, `>`, `"`, U+00A0 를 이스케이프하므로 두 번째
 * 경로만 엔티티를 되돌려야 한다. 이게 어긋나면 "개발자 도구로 고치면 되는데
 * 새로고침하면 안 되는" 형태의 버그가 된다.
 */

const entity_bearing = [
	"@sm&dark@c=red",
	"@max-width=200px&min-width=100px@w=100",
	"@(400px<=width<=700px)@w=100",
	"@(width>=640px)@w=100",
	">div/c=red",
	">div>p/c=red",
	"ct=\"hi\"",
	"[title=\"a\"]/c=red"
]

const plain = [
	"w=100",
	"flex",
	"c=red;bg=blue",
	"bd=1_solid_rgb(0_0_0_/_.2)",
	"[href='/docs']/c=red",
	":hover/c=red",
	"--gap=10;p=--gap",
	"w=100!!"
]

describe(
	"두 수집 경로는 같은 결과를 낸다",
	() => {
		for (const cname of [ ...entity_bearing, ...plain ]) {
			it(
				cname,
				() => {
					assert.equal(
						load().via_class_list(cname),
						load().via_outer_html(cname),
						"classList 경로와 outerHTML 경로가 갈라졌다"
					)
				}
			)
		}
		it(
			"여러 클래스를 한꺼번에 넣어도 같다",
			() => {
				const all = [ ...entity_bearing, ...plain ]
				assert.equal(
					load().via_class_list(...all),
					load().via_outer_html(...all)
				)
			}
		)
	}
)

describe(
	"직렬화 이스케이프를 되돌린다",
	() => {
		it(
			"실제로 이스케이프가 일어나는 입력들이다",
			() => {
				for (const cname of entity_bearing) {
					assert.notEqual(
						serialize_attribute(cname),
						cname,
						cname + " 는 직렬화될 때 바뀌어야 이 테스트가 의미가 있다"
					)
				}
			}
		)
		it(
			"&amp; 가 남으면 미디어 쿼리가 깨진다",
			() => {
				const css = load().via_outer_html("@sm&dark@c=red")
				assert.doesNotMatch(css, /amp;/)
				assert.match(
					css,
					/@media \(min-width:640px\) and \(prefers-color-scheme:dark\)/
				)
			}
		)
		it(
			"&lt; 가 남으면 range 문법이 깨진다",
			() => {
				const css = load().via_outer_html("@(400px<=width<=700px)@w=100")
				assert.doesNotMatch(css, /lt;/)
				assert.match(css, /@media \(400px<=width<=700px\)/)
			}
		)
		it(
			"&gt; 가 남으면 자식 셀렉터가 깨진다",
			() => {
				const css = load().via_outer_html(">div/c=red")
				assert.doesNotMatch(css, /gt;/)
				assert.match(css, />div\{color:red\}$/)
			}
		)
		it(
			"&quot; 가 남으면 따옴표 든 값이 깨진다",
			() => {
				const css = load().via_outer_html("ct=\"hi\"")
				assert.doesNotMatch(css, /quot;/)
				assert.match(css, /\{content:"hi"\}$/)
			}
		)
		it(
			"&amp; 를 마지막에 풀어서 &amp;lt; 가 < 로 새지 않는다",
			() => {
				// 클래스에 `&lt;` 라는 글자가 들어 있으면 `&amp;lt;` 로 직렬화된다
				const css = load().via_outer_html("ct='&lt;'")
				assert.match(css, /\{content:'&lt;'\}$/)
			}
		)
	}
)

describe(
	"중복 클래스는 한 번만 컴파일한다",
	() => {
		it(
			"같은 이름을 여러 번 넣어도 규칙은 하나",
			() => {
				const app = load()
				const once = app.via_class_list("w=100")
				app.via_class_list("w=100", "w=100")
				assert.equal(app.via_class_list("w=100"), once)
			}
		)
	}
)
