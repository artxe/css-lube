import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, declarations } from "./dom.mjs"

/**
 * 모든 케이스는 `compile` 을 거치므로 class 속성 변경 경로와 초기 파싱 경로
 * 양쪽에서 검증된다. 기대값은 선언부만 적는다 — 셀렉터는 CSS.escape 폴리필에
 * 의존하므로 selector.test.mjs 에서 따로 본다.
 * @param {Record<string, string>} cases
 */
const declares = cases => {
	for (const [ cname, expected ] of Object.entries(cases)) {
		it(
			cname + "  →  " + (expected || "(무시)"),
			() => {
				const css = compile(cname)
				if (!expected) return assert.equal(css, "", "무시되어야 한다")
				assert.notEqual(css, "", "규칙이 생성되지 않았다")
				assert.equal(declarations(css), expected)
			}
		)
	}
}

describe(
	"기본 단위",
	() => {
		declares(
			{
				"w=100": "width:100px",
				"h=100": "height:100px",
				"p=10": "padding:10px",
				"m=-10_0": "margin:-10px 0px",
				"g=10_20": "gap:10px 20px",
				"i=0": "inset:0px",
				"br=8": "border-radius:8px",
				"bd=1_solid_#000": "border:1px solid #000",
				"outline=2_dashed_red": "outline:2px dashed red",
				"ls=-1": "letter-spacing:-1px",
				"text-shadow=1_1_2_#000": "text-shadow:1px 1px 2px #000",
				"fs=16": "font-size:16px",
				"gtc=100_1fr": "grid-template-columns:100px 1fr",
				"min-width=100": "min-width:100px",
				"max-height=100": "max-height:100px",
				"inset-inline-start=10": "inset-inline-start:10px",
				"scroll-margin-block-end=10": "scroll-margin-block-end:10px",
				"border-start-end-radius=8": "border-start-end-radius:8px"
			}
		)
	}
)

describe(
	"단위가 붙으면 안 되는 프로퍼티",
	() => {
		declares(
			{
				"lh=1.5": "line-height:1.5",
				"line-height=1.5": "line-height:1.5",
				"grid-row-end=3": "grid-row-end:3",
				"grid-row-start=1": "grid-row-start:1",
				"grid-column-end=3": "grid-column-end:3",
				"grid-column-start=2": "grid-column-start:2",
				"font-size-adjust=0.5": "font-size-adjust:0.5",
				"-webkit-text-size-adjust=100%": "-webkit-text-size-adjust:100%",
				"box-sizing=border-box": "box-sizing:border-box",
				"resize=none": "resize:none",
				"fw=700": "font-weight:700",
				"z=10": "z-index:10",
				"op=0.5": "opacity:0.5",
				"f=1": "flex:1",
				"ar=16/9": "aspect-ratio:16/9"
			}
		)
	}
)

describe(
	"논리 속성",
	() => {
		declares(
			{
				"is=100": "inline-size:100px",
				"bs=100": "block-size:100px",
				"bdi=1_solid_red": "border-inline:1px solid red",
				"border-block=1": "border-block:1px",
				"inset-inline=10": "inset-inline:10px",
				"inset-block=10": "inset-block:10px",
				"mx=10": "margin-inline:10px",
				"my=10": "margin-block:10px",
				"px=10": "padding-inline:10px",
				"py=10": "padding-block:10px",
				"miw=100": "min-width:100px",
				"maw=100": "max-width:100px",
				"mih=100": "min-height:100px",
				"mah=100": "max-height:100px",
				"brtl=8": "border-top-left-radius:8px",
				"brbr=8": "border-bottom-right-radius:8px",
				"min-inline-size=100": "min-inline-size:100px",
				"max-block-size=100": "max-block-size:100px"
			}
		)
	}
)

describe(
	"괄호 안은 그대로 통과한다",
	() => {
		declares(
			{
				// 색상 함수의 공백 구분 숫자에 px 가 끼어들면 안 된다
				"bd=1_solid_rgb(0_0_0_/_.2)": "border:1px solid rgb(0 0 0 / .2)",
				"outline=2_solid_oklch(0.7_0.1_200)": "outline:2px solid oklch(0.7 0.1 200)",
				"bsd=0_2_4_rgb(0_0_0_/_.1)": "box-shadow:0px 2px 4px rgb(0 0 0 / .1)",
				"text-shadow=1_1_2_rgb(0_0_0_/_.5)": "text-shadow:1px 1px 2px rgb(0 0 0 / .5)",
				// 연산자 간격도 단위도 자동으로 넣지 않는다
				"w=calc(100%_-_16px)": "width:calc(100% - 16px)",
				"w=calc(100%_-_var(--gap))": "width:calc(100% - var(--gap))",
				"h=calc(100vh_-_var(--header-height))": "height:calc(100vh - var(--header-height))",
				"w=calc(100%_-_env(safe-area-inset-left))": "width:calc(100% - env(safe-area-inset-left))",
				"w=calc((100%_-_10px)_/_2)": "width:calc((100% - 10px) / 2)",
				"w=calc(min(10px,5%)_+_2px)": "width:calc(min(10px,5%) + 2px)",
				"w=calc(100%_-_min-content)": "width:calc(100% - min-content)",
				"gtc=100_1fr_minmax(0,_1fr)": "grid-template-columns:100px 1fr minmax(0, 1fr)",
				"br=50%_/_20": "border-radius:50% / 20px",
				"p=env(safe-area-inset-bottom)": "padding:env(safe-area-inset-bottom)"
			}
		)
	}
)

describe(
	"축약",
	() => {
		declares(
			{
				"flex": "display:flex",
				"flex;jc=center": "display:flex;justify-content:center",
				"absolute;t=0;l=0": "position:absolute;top:0px;left:0px",
				"c=red;bg=blue": "color:red;background:blue",
				"nowrap": "flex-wrap:nowrap",
				"row": "flex-direction:row",
				"tt=uppercase": "text-transform:uppercase",
				"tr=all_.2s": "transition:all .2s",
				"tf=none": "transform:none"
			}
		)
	}
)

describe(
	"커스텀 프로퍼티",
	() => {
		declares(
			{
				"--gap=10;p=--gap": "--gap:10px;padding:var(--gap)",
				"bd=1_solid_--line": "border:1px solid var(--line)",
				"c=--fg": "color:var(--fg)",
				// 괄호 안은 var() 를 직접 써야 한다
				"w=calc(--gap_*_2)": "width:calc(--gap * 2)",
				// 괄호 안은 감싸지 않는다 — 기본 단위와 같은 규칙
				"w=calc(100%_-_--gap)": "width:calc(100% - --gap)",
				"bgc=rgb(--r,--g,--b)": "background-color:rgb(--r,--g,--b)",
				"bd=var(--w)_solid_--line": "border:var(--w) solid var(--line)",
				"t=anchor(--card_bottom)": "top:anchor(--card bottom)"
			}
		)
	}
)

describe(
	"이스케이프",
	() => {
		declares(
			{
				"bgi=url(/img/hero\\_bg.png)": "background-image:url(/img/hero_bg.png)",
				"bgi=url(/a.png?v\\=1)": "background-image:url(/a.png?v=1)",
				"--my\\_var=10px": "--my_var:10px",
				"c=--my\\_color": "color:var(--my_color)",
				"ct='a\\_b'": "content:'a_b'",
				"ct='a\\=b'": "content:'a=b'",
				// 이스케이프를 안 쓰면 종전 그대로
				"ff=Roboto_Mono": "font-family:Roboto Mono",
				"m=1px_5px": "margin:1px 5px"
			}
		)
	}
)

describe(
	"우선순위",
	() => {
		it(
			"트레일링 ! 는 [class] 를 쌓는다",
			() => {
				assert.match(compile("w=100!"), /^\[class\]\./)
				assert.match(compile("w=100!!"), /^\[class\]\[class\]\./)
				assert.equal(compile("w=100!!").slice(-13), "{width:100px}")
			}
		)
		it(
			"! 가 없으면 접두사도 없다",
			() => {
				assert.match(compile("w=100"), /^\./)
			}
		)
	}
)

describe(
	"시트를 파괴하는 클래스는 버린다",
	() => {
		declares(
			{
				"ct='a": "",
				"ct=\"a": "",
				"w=calc(1": "",
				"bgi=url(a.png": "",
				"[data-x=y/c=red": "",
				":not(.a/c=red": "",
				"w=100\\": "",
				"w=)": ""
			}
		)
	}
)

describe(
	"따옴표 안은 블록이 아니므로 살린다",
	() => {
		declares(
			{
				"ct='('": "content:'('",
				"ct=')'": "content:')'",
				"ct='['": "content:'['",
				"ct=']'": "content:']'",
				"ct='{'": "content:'{'",
				"ct=\"it's\"": "content:\"it's\"",
				"ct='it\\'s'": "content:'it\\'s'"
			}
		)
	}
)

describe(
	"값이 없는 클래스는 건드리지 않는다",
	() => {
		declares({ "container": "", "my-component": "" })
	}
)

/**
 * 생성된 CSS 가 블록을 연 채로 끝나는지 본다. 열린 채로 끝나면 뒤따르는
 * 규칙을 전부 삼킨다 — check_is_open 이 막으려는 바로 그 상황이다.
 * 셀렉터 안의 `\{` 같은 이스케이프는 건너뛴다.
 * @param {string} css
 * @returns {boolean}
 */
const leaves_block_open = css => {
	let quote = ""
	let depth = 0
	for (let i = 0; i < css.length; i++) {
		const c = css[i]
		// CSS 토크나이저와 같은 시야 — 따옴표 안은 블록이 아니다
		if (c == "\\") i++
		else if (quote) {
			if (c == quote) quote = ""
		} else if (c == "'" || c == "\"") quote = c
		else if (c == "(" || c == "[" || c == "{") depth++
		else if (c == ")" || c == "]" || c == "}") depth--
	}
	return !!quote || depth != 0
}

describe(
	"최상위 / 가 없는 선택자형 클래스",
	() => {
		declares(
			{
				// 셀렉터를 비우고 전체를 값으로 넘긴다. 무효 선언은 브라우저가 버리지만
				// slice(0, -1) 로 `]` 를 잘라내면 시트가 열린 채로 남는다
				"[a=b]": "[a:b]",
				"[data-x=y]": "[data-x:y]",
				"#id[a=b]": "#id[a:b]",
				":hover:focus": ":hover:focus"
			}
		)
	}
)

describe(
	"어떤 클래스도 시트를 열어둔 채 끝내지 않는다",
	() => {
		const corpus = [
			"[a=b]",
			"[data-x=y]",
			"#id[a=b]",
			"[a=b]/c=red",
			"[href='/docs']/c=red",
			":not(.a/b)/c=red",
			"ct='('",
			"ct=')'",
			"ct='['",
			"ct=']'",
			"ct='{'",
			"ct='}'",
			"ct=\"it's\"",
			"ct='it\'s'",
			"w=calc(100%_-_var(--gap))",
			"bgi=url(a(b).png)",
			"@sm@[a=b]",
			"@sm@:hover/c=red",
			"w=100!!",
			"bd=1_solid_rgb(0_0_0_/_.2)",
			"gtc=repeat(auto-fill,_minmax(200,_1fr))",
			">div/c=red",
			"flex"
		]
		for (const cname of corpus) {
			it(
				cname,
				() => {
					const css = compile(cname)
					assert.ok(
						!leaves_block_open(css),
						"블록이 열린 채로 끝난다: " + JSON.stringify(css)
					)
				}
			)
		}
	}
)

describe(
	"; 는 구분자가 아니라 앵커다",
	() => {
		declares(
			{
				// 값 안의 ; 는 그대로 살아남는다 — data URI 포함
				"ct='a;b'": "content:'a;b'",
				"ct='1;2;3'": "content:'1;2;3'",
				"bgi=url(data:image/png;base64,iVBOR)":
					"background-image:url(data:image/png;base64,iVBOR)",
				"bgi=url(data:image/svg+xml;utf8,%3Csvg%3E)":
					"background-image:url(data:image/svg+xml;utf8,%3Csvg%3E)",
				"bgi=url(a;b);w=10": "background-image:url(a;b);width:10px",
				// 어긋나는 단 하나의 모양: ; + 소문자 1~4자 + =
				"ct='a;b=c'": "content:'a;bottom:c'",
				"ct='a;w=1'": "content:'a;width:1'",
				// 그 모양을 벗어나면 멀쩡하다
				"ct='a;bbbbb=c'": "content:'a;bbbbb:c'",
				"ct='a;B=c'": "content:'a;B:c'",
				"ct='a;b_c'": "content:'a;b c'",
				// 우회: = 를 이스케이프하면 콜론이 안 생겨 확장이 안 걸린다
				"ct='a;b\\=c'": "content:'a;b=c'",
				// 우회: 콜론이 필요하면 세미콜론을 CSS 이스케이프로
				"ct='a\\3b_b=c'": "content:'a\\3b b:c'"
			}
		)
	}
)

describe(
	"이름은 단위 목록에 걸리지만 값이 무단위인 프로퍼티",
	() => {
		declares(
			{
				// SVG 사용자 단위 — viewBox 스케일을 따르므로 px 가 붙으면 다르게 그려진다
				"stroke-width=1.5": "stroke-width:1.5",
				// 앞서 잡은 같은 부류
				"line-height=1.5": "line-height:1.5",
				"grid-row-start=2": "grid-row-start:2",
				// 드물거나 틀렸을 때 눈에 띄는 것은 예외 목록 대신 ~ 마커로 처리한다
				"border-image-width=~2": "border-image-width:2",
				"mask-border-width=~2": "mask-border-width:2",
				"tab-size=~4": "tab-size:4",
				// 반대로 이것들은 계속 붙어야 한다
				"width=2": "width:2px",
				"min-width=2": "min-width:2px",
				"max-width=2": "max-width:2px",
				"border-width=2": "border-width:2px",
				"border-top-width=2": "border-top-width:2px",
				"outline-width=2": "outline-width:2px",
				"column-rule-width=2": "column-rule-width:2px",
				"border-inline-start-width=2": "border-inline-start-width:2px"
			}
		)
	}
)

describe(
	"~ 로 시작하는 값에는 기본 단위가 붙지 않는다",
	() => {
		declares(
			{
				"w=~100": "width:100",
				// 값 안의 모든 숫자에 걸린다
				"m=~-10_0": "margin:-10 0",
				"border-image-width=~2_3_4_5": "border-image-width:2 3 4 5",
				// 단위를 직접 쓴 숫자는 어차피 대상이 아니라서 섞을 수 있다
				"mask-border=~url(m.png)_30_/_20px": "mask-border:url(m.png) 30 / 20px",
				// 숫자마다 붙이던 예전 표기도 그대로 동작한다
				"p=~8_~16": "padding:8 16",
				// 라이브러리 수정 없이 앞으로 나올 무단위 프로퍼티를 처리한다
				"some-new-width=~2": "some-new-width:2",
				// 마커가 없으면 종전 그대로
				"w=100": "width:100px",
				"border-image-width=2": "border-image-width:2px",
				"tab-size=4": "tab-size:4px",
				// 단위가 붙지 않을 자리에 덧붙여도 결과가 같다
				"lh=~1.5": "line-height:1.5",
				"stroke-width=~1.5": "stroke-width:1.5",
				"grid-row-start=~2": "grid-row-start:2",
				// 값의 시작 자리에서만 읽으므로 따옴표 안의 ~ 는 남는다
				"ct='~1'": "content:'~1'",
				"ct='~'": "content:'~'",
				// 괄호 안은 그대로 통과한다
				"w=calc(100%_-_~2)": "width:calc(100% - ~2)"
			}
		)
	}
)
