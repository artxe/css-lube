import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, declarations, prelude } from "./dom.mjs"

/** @param {Record<string, [string, string]>} cases `클래스: [ 셀렉터, 선언부 ]` */
const rules = cases => {
	for (const [ cname, [ selector, body ] ] of Object.entries(cases)) {
		it(
			cname + "  →  " + selector,
			() => {
				const css = compile(cname)
				const i = css.lastIndexOf(body ? "{" + body + "}" : "{")
				assert.notEqual(i, -1, "선언부를 찾지 못했다: " + JSON.stringify(css))
				assert.equal(declarations(css), body)
				// 셀렉터는 이스케이프된 클래스명 뒤에 그대로 이어붙는다
				assert.ok(
					css.slice(0, i).endsWith(selector),
					JSON.stringify(css.slice(0, i)) + " 가 " + JSON.stringify(selector) + " 로 끝나야 한다"
				)
			}
		)
	}
}

describe(
	"셀렉터",
	() => {
		rules(
			{
				":hover/c=red": [ ":hover", "color:red" ],
				"::after/ct=''": [ "::after", "content:''" ],
				":nth-child(2n+1)/c=red": [ ":nth-child(2n+1)", "color:red" ],
				":is(:hover,:focus)/c=red": [ ":is(:hover,:focus)", "color:red" ],
				">div/c=red": [ ">div", "color:red" ],
				"_[type=number]/fs=2em": [ " [type=number]", "font-size:2em" ],
				":not(.a)/c=red": [ ":not(.a)", "color:red" ]
			}
		)
	}
)

describe(
	"최상위 / 만 셀렉터를 자른다",
	() => {
		rules(
			{
				"[href='/docs']/c=red": [ "[href='/docs']", "color:red" ],
				"[title=\"a/b\"]/bg=red": [ "[title=\"a/b\"]", "background:red" ],
				":not(.a/b)/c=red": [ ":not(.a/b)", "color:red" ]
			}
		)
		it(
			"값 쪽 / 는 건드리지 않는다",
			() => {
				assert.equal(
					declarations(compile(":hover/gr=1_/_3")),
					"grid-row:1 / 3"
				)
			}
		)
	}
)

describe(
	"미디어 쿼리",
	() => {
		/** @param {Record<string, [string, string]>} cases */
		const queries = cases => {
			for (const [ cname, [ at, body ] ] of Object.entries(cases)) {
				it(
					cname + "  →  " + at,
					() => {
						const css = compile(cname)
						assert.equal(prelude(css), at)
						assert.equal(declarations(css), body)
					}
				)
			}
		}
		queries(
			{
				"@sm@w=100": [ "@media (min-width:640px)", "width:100px" ],
				"@2xl@w=100": [ "@media (min-width:1536px)", "width:100px" ],
				"@dark@c=red": [ "@media (prefers-color-scheme:dark)", "color:red" ],
				"@sm&dark@c=red": [
					"@media (min-width:640px) and (prefers-color-scheme:dark)",
					"color:red"
				],
				"@min-width=640px@w=100": [ "@media (min-width:640px)", "width:100px" ],
				"@max-width=200px&min-width=100px@w=100": [
					"@media (max-width:200px) and (min-width:100px)",
					"width:100px"
				],
				// Media Queries Level 4 range — >= / <= 의 = 는 조건 구분자가 아니다
				"@(width>=640px)@w=100": [ "@media (width>=640px)", "width:100px" ],
				"@(400px<=width<=700px)@w=100": [ "@media (400px<=width<=700px)", "width:100px" ],
				"@(width>640px)@w=100": [ "@media (width>640px)", "width:100px" ],
				// @@ 는 @media 접두사를 붙이지 않는다
				"@@supports_(display=grid)@d=grid": [ "@supports ((display:grid))", "display:grid" ],
				"@@container_card_(min-width=400px)@d=grid": [
					"@container card ((min-width:400px))",
					"display:grid"
				]
			}
		)
		it(
			"미디어 안에서도 셀렉터와 우선순위가 동작한다",
			() => {
				const css = compile("@sm@:hover/c=red")
				assert.equal(prelude(css), "@media (min-width:640px)")
				assert.equal(declarations(css), "color:red")
				assert.match(css, /:hover\{color:red\}\}$/)
				assert.match(compile("@dark@w=100!"), /\{\[class\]\./)
			}
		)
	}
)

describe(
	"다크 테마 전환",
	() => {
		it(
			"THEME 이 없으면 prefers-color-scheme 이 그대로 남는다",
			async () => {
				const { load } = await import("./dom.mjs")
				const app = load()
				app.via_class_list("@dark@c=white")
				assert.match(
					app.rebuild(),
					/@media \(prefers-color-scheme:dark\)/
				)
			}
		)
		it(
			"THEME=DARK 는 항상 참인 쿼리로 바꾼다",
			async () => {
				const { load } = await import("./dom.mjs")
				const app = load()
				app.via_class_list("@dark@c=white")
				const css = app.rebuild("DARK")
				assert.match(css, /@media \(color\)/)
				assert.doesNotMatch(css, /prefers-color-scheme/)
			}
		)
		it(
			"THEME=LIGHT 는 절대 맞지 않는 쿼리로 바꾼다",
			async () => {
				const { load } = await import("./dom.mjs")
				const app = load()
				app.via_class_list("@dark@c=white")
				assert.match(app.rebuild("LIGHT"), /@media \(\)/)
			}
		)
	}
)
