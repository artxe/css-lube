<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { bracket, declare, func, html, keyword, name, number, string, type } from "ts/highlighter"
import ComponentTabView from "organs/ref/ComponentTabView.svelte"
import Pagination from "organs/@common/utils/Pagination.svelte"

let count = 0
let list: any[]
let index = 0
let size = 10

$: view = list?.slice(index, Math.min(index + size, list.length))

const handleChange = ({ detail }: { detail: { index: number, size: number }}) => {
	index = detail.index
	size = detail.size
}
const getList = () => {
	if (count < 0) {
		count = 0
	} else {
		count = Math.floor(count)
	}
	list = new Array(count)
	for (let i = 0; i < list?.length; i++) {
		list[i] = { title: "Lorem Ipsum is simply dummy text " + (i + 1) }
	}
}
</script>

<ComponentTabView>
	<div>
		<span>contents: </span><input bind:value={count}
				type="number" class="bg=inherit w=3 ta=right"
				on:change={getList} />ea
		<div class="bd=.1_solid p=1">
			{#if view?.length}
			<div>{view[0].title}</div>
			. . .
			<div>{view[view.length - 1].title}</div>
			{:else}
			Empty
			{/if}
		</div>
		<select bind:value={size} class="@dark@bg=#222">
			<option value={10}>10</option>
			<option value={20}>20</option>
			<option value={50}>50</option>
			<option value={100}>100</option>
			<option value={200}>200</option>
		</select>
		<Pagination bind:size
				on:change={handleChange}
				{list} />
	</div>
	<CodePage isCode>{@html
`${html("script", ` ${name("lang")}=${string("ts")}`, `
${keyword("import")} ${name("Pagination")} ${keyword("from")} ${string("src/instant-ui/components/pagination/Pagination.svelte")}

${declare("let")} ${name("count")} = ${number(0)}
${declare("let")} ${name("list")}: ${type("any")}${bracket("[]")}
${declare("let")} ${name("index")} = ${number(0)}
${declare("let")} ${name("size")} = ${number(10)}

$: ${name("view")} = ${name("list")}?.${func("slice")}${bracket("(")}${name("index")}, ${name("Math")}.${func("min")}${bracket("(", 1)}${name("index")} + ${name("size")}, ${name("list")}.${name("length")}${bracket(")", 1)}${bracket(")")}

${declare("const")} ${func("handleChange")} = ${bracket("(")}${bracket("{", 1)} ${name("detail")} ${bracket("}", 1)}: ${bracket("{", 1)} ${name("detail")}: ${bracket("{", 2)} ${name("index")}: ${type("number")}, ${name("size")}: ${type("number")} ${bracket("}", 2)}${bracket("}", 1)}${bracket(")")} ${declare("=>")} ${bracket("{")}
	${name("index")} = ${name("detail")}.${name("index")}
	${name("size")} = ${name("detail")}.${name("size")}
${bracket("}")}
${declare("const")} ${func("getList")} = ${bracket("()")} ${declare("=>")} ${bracket("{")}
	${keyword("if")} ${bracket("(", 1)}${name("count")} < ${number(0)}${bracket(") {", 1)}
		${name("count")} = ${number(0)}
	${bracket("}", 1)} ${keyword("else")} ${bracket("{", 1)}
		${name("count")} = ${name("Math")}.${func("floor")}${bracket("(", 2)}${name("count")}${bracket(")", 2)}
	${bracket("}", 1)}
	${name("list")} = ${declare("new")} ${type("Array")}${bracket("(", 1)}${name("count")}${bracket(")", 1)}
	${keyword("for")} ${bracket("(", 1)}${declare("let")} ${name("i")} = ${number(0)}; ${name("i")} < ${name("list")}?.${name("length")}; ${name("i")}++${bracket(") {", 1)}
		${name("list")}${bracket("[", 2)}${name("i")}${bracket("]", 2)} = ${bracket("{", 2)} ${name("title:")} ${string("Lorem Ipsum is simply dummy text ")} + ${bracket("(")}${name("i")} + ${number(1)}${bracket(")")} ${bracket("}", 2)}
	${bracket("}", 1)}
${bracket("}")}
`)}

${html("div", "", `
	${html("span", "", "contents: ")}${html("input", ` ${keyword("bind")}:${type("value")}=${bracket("{")}${name("count")}${bracket("}")}
			${name("type")}=${string("number")} ${name("type")}=${string("bg=inherit w=3 ta=right")}
			${keyword("on")}:${type("change")}=${bracket("{")}${func("getList")}${bracket("}")}`, false)}ea
	${html("div", ` ${name("class")}=${string("bd=.1_solid p=1")}`, `
		${bracket("{")}#${keyword("if")} ${name("view")}.?${name("length")}${bracket("}")}
		${html("div", "", `${bracket("{")}${name("view")}${bracket("[", 1)}${number(0)}${bracket("]", 1)}.${name("title")}${bracket("}")}`)}
		. . .
		${html("div", "", `${bracket("{")}${name("view")}${bracket("[", 1)}${name("view")}.${name("length")} - ${number(1)}${bracket("]", 1)}.${name("title")}${bracket("}")}`)}
		${bracket("{")}:${keyword("else")}${bracket("}")}
		Empty
		${bracket("{")}/${keyword("if")}${bracket("}")}
	`)}
	${html("select", ` ${keyword("bind")}:${type("value")}=${bracket("{")}${name("size")}${bracket("}")} ${name("class")}=${string("@dark@bg=#222")}`, `
		${html("option", ` ${name("value")}=${bracket("{")}${number(10)}${bracket("}")}`, "10")}
		${html("option", ` ${name("value")}=${bracket("{")}${number(20)}${bracket("}")}`, "20")}
		${html("option", ` ${name("value")}=${bracket("{")}${number(50)}${bracket("}")}`, "50")}
		${html("option", ` ${name("value")}=${bracket("{")}${number(100)}${bracket("}")}`, "100")}
		${html("option", ` ${name("value")}=${bracket("{")}${number(200)}${bracket("}")}`, "200")}
	`)}
	${html("Pagination", ` ${keyword("bind")}:${name("size")}
			${keyword("on")}:${type("change")}=${bracket("{")}${func("handleChange")}${bracket("}")}
			${bracket("{")}${name("list")}${bracket("}")}`, false)}
`)}`
	}</CodePage>
</ComponentTabView>