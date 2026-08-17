import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { describe, it } from "node:test"
import { compile, declarations, prelude } from "./dom.mjs"

/**
 * VSCode 확장은 호버 프리뷰를 위해 컴파일 파이프라인을 한 벌 더 갖고 있다.
 * 둘이 조용히 벌어지면 에디터가 실제와 다른 CSS 를 보여준다 — 실제로 그런
 * 상태로 한동안 방치됐던 적이 있어서 여기서 붙잡는다.
 *
 * 셀렉터 표기는 일부러 다르다 (확장은 클래스 자리에 `&` 를 쓴다).
 * 그래서 선언부와 at-rule 프렐류드만 비교한다.
 */

const vsce_root = new URL("../vsce/", import.meta.url)
const require_ = createRequire(new URL("./src/helper/", vsce_root))

/**
 * 확장의 축약 맵은 VSCode 설정에서 온다 — package.json 의 기본값으로 대신한다
 * @type {Record<string, { default: [ string, string ][] }>}
 */
const configuration = {}
for (const section of JSON.parse(
	readFileSync(new URL("./package.json", vsce_root), "utf8")
)
	.contributes.configuration) {
	Object.assign(configuration, section.properties)
}
const Module = require_("node:module")
const load_original = Module._load
/**
 * @param {string} request
 * @param {...any} rest
 * @returns {any}
 */
Module._load = function (request, ...rest) {
	return request == "vscode"
		? {
			workspace: {
				getConfiguration: () => ({
					/** @param {string} key */
					get: key => /** @type {{ default: [ string, string ][] }} */(
						configuration[key]
					)/**/.default
				})
			}
		}
		: load_original.call(this, request, ...rest)
}
const compile_vsce = require_("./compile_style.js")

/**
 * 확장 출력에서 하이라이트용 마크업만 걷어낸다
 * @param {string} html
 * @returns {string}
 */
const plain = html => html
	.replace(/<\/?(?:span|br)\b[^>]*>/g, "")
	.replace(/&nbsp;/g, " ")
	.replace(/&lt;/g, "<")

/**
 * 확장은 읽기 좋으라고 `{ width: 100px }` 처럼 구분자 뒤에 공백을 넣는다.
 * 그 공백만 지운다 — 값 안의 공백은 실제 차이일 수 있으므로 건드리지 않는다.
 * @param {string} css
 * @returns {string}
 */
const normalize = css => css.trim().replace(/([:;])\s+/g, "$1")

const corpus = [
	"w=100",
	"lh=1.5",
	"c=red;bg=blue",
	"flex",
	"flex;jc=center",
	"absolute;t=0;l=0",
	"bd=1_solid_rgb(0_0_0_/_.2)",
	"bdi=1_solid_red",
	"inset-inline=10",
	"is=100",
	"bs=100",
	"w=calc(100%_-_var(--gap))",
	"h=calc(100vh_-_var(--header-height))",
	"bgi=url(/img/hero\\_bg.png?v\\=2)",
	"ct='a\\_b'",
	"--gap=10;p=--gap",
	"bd=1_solid_--line",
	"m=0_auto",
	"g=10_20",
	"br=50%_/_20",
	"gtc=repeat(auto-fill,_minmax(200,_1fr))",
	"tab-size=~4",
	"grid-row-end=3",
	"w=100!!",
	"p=10!important",
	":hover/c=red",
	">div/c=red",
	"_[type=number]/fs=2em",
	"[href='/docs']/c=red",
	":not(.a/b)/c=red",
	"::after/ct=''",
	":is(:hover,:focus)/c=red",
	"@sm@w=100",
	"@sm&dark@c=red",
	"@min-width=640px@w=100",
	"@(width>=640px)@w=100",
	"@(400px<=width<=700px)@w=100",
	"@@supports_(display=grid)@d=grid",
	"@sm@:hover/c=red",
	"@dark@w=100!",
	"ff=Arial,_sans-serif",
	"tr=all_.3s_cubic-bezier(.4,0,.2,1)",
	"tt=uppercase",
	"ct='('",
	"ct=\"it's\"",
	"w=calc(1",
	"[data-x=y/c=red"
]

describe(
	"lib ↔ vsce 확장",
	() => {
		it(
			"확장 소스를 실제로 불러온다",
			() => {
				assert.equal(typeof compile_vsce, "function")
				assert.ok(
					readFileSync(
						new URL("./src/helper/compile_style.js", vsce_root),
						"utf8"
					).includes("check_is_open")
				)
			}
		)
		for (const cname of corpus) {
			it(
				cname,
				() => {
					const lib = compile(cname)
					const vsce = plain(compile_vsce(cname))
					if (!lib) return assert.equal(vsce, "", "lib 이 버린 클래스를 확장은 보여준다")
					assert.equal(
						normalize(declarations(vsce)),
						normalize(declarations(lib)),
						"선언부가 다르다"
					)
					assert.equal(
						normalize(prelude(vsce)),
						normalize(prelude(lib)),
						"at-rule 프렐류드가 다르다"
					)
				}
			)
		}
	}
)

describe(
	"확장 호버는 HTML 이다",
	() => {
		for (const cname of [
			"@(400px<=width<=700px)@w=100",
			"@(width<640px)@w=100",
			"ct='a<b'"
		]) {
			it(
				cname + " 의 < 는 이스케이프된다",
				() => {
					const html = compile_vsce(cname).replace(/<\/?(?:span|br)\b[^>]*>/g, "")
					assert.doesNotMatch(html, /</, "미이스케이프 < 가 태그로 먹혀 프리뷰가 깨진다")
				}
			)
		}
	}
)
