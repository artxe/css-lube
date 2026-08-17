import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { describe, it } from "node:test"
import { load } from "./dom.mjs"

/**
 * `pnpm build` 가 내놓는 산출물이 소스와 같은 CSS 를 내는지 본다.
 * 수동 복사로 관리하던 시절 packages/lib 과 docs 의 사본이 서로 달랐다.
 */

const targets = {
	"packages/lib/min.js": new URL("../lib/min.js", import.meta.url),
	"docs/min.js": new URL("../../docs/min.js", import.meta.url)
}

const corpus = [
	"w=100",
	"lh=1.5",
	"flex",
	"c=red;bg=blue",
	"bdi=1_solid_red",
	"inset-inline=10",
	"bd=1_solid_rgb(0_0_0_/_.2)",
	"w=calc(100%_-_var(--gap))",
	"tab-size=~4",
	"bgi=url(/img/hero\\_bg.png?v\\=2)",
	"ct='('",
	"ct=\"it's\"",
	"w=100!!",
	":hover/c=red",
	">div/c=red",
	"[href='/docs']/c=red",
	":not(.a/b)/c=red",
	"@sm@w=100",
	"@sm&dark@c=red",
	"@(400px<=width<=700px)@w=100",
	"@@supports_(display=grid)@d=grid",
	"--gap=10;p=--gap",
	"w=calc(1",
	"[data-x=y/c=red"
]

const expected_class_list = load().via_class_list(...corpus)
const expected_outer_html = load().via_outer_html(...corpus)
const expected_reset = load().reset

describe(
	"빌드 산출물",
	() => {
		for (const [ name, url ] of Object.entries(targets)) {
			describe(
				name,
				() => {
					/** @type {string} */
					let minified
					it(
						"존재하고 비어 있지 않다",
						() => {
							minified = readFileSync(url, "utf8")
							assert.ok(minified.length > 1000, "빌드가 안 돌았거나 잘렸다")
						}
					)
					it(
						"리셋이 소스와 같다",
						() => {
							assert.equal(load(minified).reset, expected_reset)
						}
					)
					it(
						"classList 경로 결과가 소스와 같다",
						() => {
							assert.equal(
								load(minified).via_class_list(...corpus),
								expected_class_list
							)
						}
					)
					it(
						"outerHTML 경로 결과가 소스와 같다",
						() => {
							assert.equal(
								load(minified).via_outer_html(...corpus),
								expected_outer_html
							)
						}
					)
				}
			)
		}
		it(
			"두 사본이 서로 같다",
			() => {
				const [ a, b ] = Object.values(targets).map(url => readFileSync(url, "utf8"))
				assert.equal(
					a,
					b,
					"packages/lib 과 docs 의 사본이 갈라졌다 — pnpm build 를 돌려라"
				)
			}
		)
		it(
			"package.json 의 버전을 스탬프한다",
			() => {
				const { version } = JSON.parse(
					readFileSync(
						new URL("../lib/package.json", import.meta.url),
						"utf8"
					)
				)
				for (const url of Object.values(targets)) {
					assert.match(
						readFileSync(url, "utf8"),
						new RegExp("\"v" + version + "\"")
					)
				}
			}
		)
	}
)
