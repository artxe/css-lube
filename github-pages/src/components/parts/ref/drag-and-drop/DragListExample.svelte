<script lang="ts">
import { done$, doneTf$, drag$, todo$, todoTf$, transition$ } from "parts/ref/store"
import { onDestroy, onMount } from "svelte"
import CodePage from "organs/@common/utils/CodePage.svelte"
import ComponentTabView from "organs/ref/ComponentTabView.svelte"
import DragItemForExample from "parts/ref/drag-and-drop/DragItemForExample.svelte"
import DragContainer from "organs/@common/utils/DragContainer.svelte"
import DragItemPlaceHolderForExample from "parts/ref/drag-and-drop/DragItemPlaceHolderForExample.svelte"
import { bracket, declare, func, html, keyword, name, number, string, type } from "ts/highlighter"
import IdeSvelte from "cells/typography/IdeSvelte.svelte"
import IdeTypescript from "cells/typography/IdeTypescript.svelte"

const code1 = `${html("script", ` ${name("lang")}=${string("ts")}`, `
${keyword("import")} ${name("DragContainer")} ${keyword("from")} ${string("organs/@common/utils/DragContainer.svelte")}
${keyword("import")} ${name("DragItemForExample")} ${keyword("from")} ${string("parts/ref/DragItemForExample.svelte")}
${keyword("import")} ${name("DragItemPlaceHolderForExample")} ${keyword("from")} ${string("parts/ref/DragItemPlaceHolderForExample.svelte")}
${keyword("import")} ${bracket("{")} ${name("done$")}, ${name("doneTf$")}, ${name("drag$")}, ${name("todo$")}, ${name("todoTf$")}, ${name("transition$")} ${bracket("}")} ${keyword("from")} ${string("parts/ref/store")}
${keyword("import")} ${bracket("{")} ${name("onDestroy")}, ${name("onMount")} ${bracket("}")} ${keyword("from")} ${string("svelte")}

${declare("const")} ${name("todoHeights", true)}: ${type("number")}${bracket("[]")} = ${bracket("[]")}
${declare("const")} ${name("doneHeights", true)}: ${type("number")}${bracket("[]")} = ${bracket("[]")}
${declare("let")} ${name("isDragging")}: ${type("boolean")}
${declare("let")} ${func("setDragElement")}: ${bracket("(")}${name("clientX")}: ${type("number")}, ${name("clientY")}: ${type("number")}, ${name("drag")}: ${type("HTMLElement")}${bracket(")")} ${declare("=>")} ${type("any")}

${declare("const")} ${func("handleDragend")} = ${bracket("()")} ${declare("=>")} ${bracket("{")}
	${declare("const")} ${name("from", true)} = ${name("$drag$")}!.${name("index")}
	${declare("const")} ${name("type", true)} = ${name("$drag$")}!.${name("type")}
	${name("$drag$")} = ${declare("null")}
	${func("reOrdering")}${bracket("(", 1)}${name("from", true)}, ${name("type", true)}${bracket(")", 1)}
${bracket("}")}
${declare("const")} ${func("transferList")} = ${bracket("(")}${name("index")}: ${type("number")}${bracket(")")} ${declare("=>")} ${bracket("{")}
	${declare("const")} ${name("from", true)} = ${name("$drag$")}!.${name("index")}
	${declare("const")} ${name("type", true)} = ${name("$drag$")}!.${name("type")}
	${declare("const")} ${name("transforms", true)} = ${bracket("[", 1)}...${bracket("(", 2)}${name("type", true)} === ${string("todo")} ? ${name("$todoTf$")} : ${name("$doneTf$")} ${bracket(")", 2)}${bracket("]", 1)}
	${keyword("if")} ${bracket("(", 1)}${name("from", true)} < ${name("index")}${bracket(") {", 1)}
		${keyword("if")} ${bracket("(", 2)}${name("transforms", true)}${bracket("[")}${name("index")}${bracket("]")}${bracket(") {", 2)}
			${keyword("for")} ${bracket("(")}${declare("let")} ${name("i")} = ${name("index")}; ${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}; ${name("i")}++${bracket(") {")}
				${name("transforms", true)}${bracket("[", 1)}${name("from", true)}${bracket("]", 1)} -= ${name("heights", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}
				${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)} = ${number(0)}
			${bracket("}")}
		${bracket("}", 2)} ${keyword("else")} ${bracket("{", 2)}
			${keyword("for")} ${bracket("(")}${declare("let")} ${name("i")} = ${name("index")}; !${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}; ${name("i")}--${bracket(") {")}
				${name("transforms", true)}${bracket("[", 1)}${name("from", true)}${bracket("]", 1)} += ${name("heights", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}
				${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)} = -${name("heights", true)}${bracket("[", 1)}${name("from", true)}${bracket("]", 1)}
			${bracket("}")}
		${bracket("}", 2)}
	${bracket("}", 1)} ${keyword("else")} ${bracket("{", 1)}
		${keyword("if")} ${bracket("(", 2)}${name("transforms", true)}${bracket("[")}${name("index")}${bracket("]")}${bracket(") {", 2)}
			${keyword("for")} ${bracket("(")}${declare("let")} ${name("i")} = ${name("index")}; ${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}; ${name("i")}--${bracket(") {")}
				${name("transforms", true)}${bracket("[", 1)}${name("from", true)}${bracket("]", 1)} += ${name("heights", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}
				${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)} = ${number(0)}
			${bracket("}")}
		${bracket("}", 2)} ${keyword("else")} ${bracket("{", 2)}
			${keyword("for")} ${bracket("(")}${declare("let")} ${name("i")} = ${name("index")}; !${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}; ${name("i")}++${bracket(") {")}
				${name("transforms", true)}${bracket("[", 1)}${name("from", true)}${bracket("]", 1)} -= ${name("heights", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}
				${name("transforms", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)} = ${name("heights", true)}${bracket("[", 1)}${name("from", true)}${bracket("]", 1)}
			${bracket("}")}
		${bracket("}", 2)}
	${bracket("}", 1)}
	${bracket("(", 1)}${name("type", true)} === ${string("todo")} ? ${name("todoTf$", true)} : ${name("doneTf$", true)} ${bracket(")", 1)}.${func("set")}${bracket("(", 1)}${name("transforms", true)}${bracket(")", 1)}
${bracket("}")}
${declare("const")} ${func("moveItem")} = ${bracket("(")}${name("index")}: ${type("number")}${bracket(")")} ${declare("=>")} ${bracket("{")}
	${declare("const")} ${name("from", true)} = ${name("$drag$")}!.${name("index")}
	${declare("const")} ${name("type", true)} = ${name("$drag$")}!.${name("type")}
	${keyword("if")} ${bracket("(", 1)}${name("from", true)} === ${string("todo")}${bracket(") {", 1)}
		${declare("const")} ${name("before", true)} = ${name("$todo$")}.${func("slice")}${bracket("()", 2)}
		${declare("const")} ${name("after", true)} = ${name("$done$")}.${func("slice")}${bracket("()", 2)}
		${name("after", true)}.${func("splice")}${bracket("(", 2)}${name("index")}, ${number(0)}, ${name("before", true)}${bracket("[")}${name("from", true)}${bracket("]")}${bracket(")", 2)}
		${name("before", true)}.${func("splice")}${bracket("(", 2)}${name("from", true)}, ${number(1)}${bracket(")", 2)}
		${name("$todo$")} = ${name("before", true)}
		${name("$done$")} = ${name("after", true)}
		${name("$todoTf$")} = ${declare("new")} ${type("Array")}${bracket("(", 2)}${name("before", true)}.${name("length")}${bracket(")", 2)}.${func("fill")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
		${name("$doneTf$")} = ${declare("new")} ${type("Array")}${bracket("(", 2)}${name("after", true)}.${name("length")}${bracket(")", 2)}.${func("fill")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
		${name("$drag$")} = ${bracket("{", 2)} ${name("type:")} ${string("done")}, ${name("index: index")} ${bracket("}", 2)}
		${name("doneHeights", true)}.${func("splice")}${bracket("(", 2)}${name("index")}, ${number(0)}, ${name("todoHeights", true)}${bracket("[")}${name("from", true)}${bracket("]")}${bracket(")", 2)}
		${name("todoHeights", true)}.${func("splice")}${bracket("(", 2)}${name("from", true)}, ${number(1)}${bracket(")", 2)}
	${bracket("}", 1)} ${keyword("else")} ${bracket("{", 1)}
		${declare("const")} ${name("before", true)} = ${name("$done$")}.${func("slice")}${bracket("()", 2)}
		${declare("const")} ${name("after", true)} = ${name("$todo$")}.${func("slice")}${bracket("()", 2)}
		${name("after", true)}.${func("splice")}${bracket("(", 2)}${name("index")}, ${number(0)}, ${name("before", true)}${bracket("[")}${name("from", true)}${bracket("]")}${bracket(")", 2)}
		${name("before", true)}.${func("splice")}${bracket("(", 2)}${name("from", true)}, ${number(1)}${bracket(")", 2)}
		${name("$done$")} = ${name("before", true)}
		${name("$todo$")} = ${name("after", true)}
		${name("$doneTf$")} = ${declare("new")} ${type("Array")}${bracket("(", 2)}${name("before", true)}.${name("length")}${bracket(")", 2)}.${func("fill")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
		${name("$todoTf$")} = ${declare("new")} ${type("Array")}${bracket("(", 2)}${name("after", true)}.${name("length")}${bracket(")", 2)}.${func("fill")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
		${name("$drag$")} = ${bracket("{", 2)} ${name("type:")} ${string("todo")}, ${name("index: index")} ${bracket("}", 2)}
		${name("todoHeights", true)}.${func("splice")}${bracket("(", 2)}${name("index")}, ${number(0)}, ${name("doneHeights", true)}${bracket("[")}${name("from", true)}${bracket("]")}${bracket(")", 2)}
		${name("doneHeights", true)}.${func("splice")}${bracket("(", 2)}${name("from", true)}, ${number(1)}${bracket(")", 2)}
	${bracket("}", 1)}
${bracket("}")}
${declare("const")} ${func("reOrdering")} = ${bracket("(")}${name("from")}: ${type("number")}, ${name("type")}: ${type("string")}${bracket(")")} ${declare("=>")} ${bracket("{")}
	${declare("const")} ${name("transforms", true)} = ${bracket("[", 1)}...${bracket("(", 2)}${name("type")} === ${string("todo")} ? ${name("$todoTf$")} : ${name("$doneTf$")} ${bracket(")", 2)}${bracket("]", 1)}
	${keyword("if")} ${bracket("(", 1)}${name("transforms", true)}${bracket("[", 2)}${name("from")}${bracket("]", 2)} === ${number(0)}${bracket(") {", 1)}
		${keyword("return")}
	${bracket("}", 1)}
	${declare("const")} ${name("list", true)} = ${bracket("[", 1)}...${bracket("(", 2)}${name("type")} === ${string("todo")} ? ${name("$todo$")} : ${name("$done$")} ${bracket(")", 2)}${bracket("]", 1)}
	${declare("const")} ${name("temp", true)} = ${name("list", true)}${bracket("[", 1)}${name("from")}${bracket("]", 1)}
	${declare("let")} ${name("i")}
	${keyword("if")} ${bracket("(", 1)}${name("transforms", true)}${bracket("[", 2)}${name("from")}${bracket("]", 2)} < ${number(0)}${bracket(") {", 1)}
		${keyword("for")} ${bracket("(", 2)}${name("i")} = ${name("from")} - ${number(1)}; ${name("transforms", true)}${bracket("[")}${name("i")}${bracket("]")}; ${name("i")}--${bracket(") {", 2)}
			${name("list", true)}${bracket("[")}${name("i")} + ${number(1)}${bracket("]")} = ${name("list", true)}${bracket("[")}${name("i")}${bracket("]")}
			${name("transforms", true)}${bracket("[")}${name("i")}${bracket("]")} = ${number(0)}
		${bracket("}", 2)}
		${name("list", true)}${bracket("[", 2)}${name("i")} + ${number(1)}${bracket("]", 2)} = ${name("temp", true)}
	${bracket("}", 1)} ${keyword("else")} ${bracket("{", 1)}
		${keyword("for")} ${bracket("(", 2)}${name("i")} = ${name("from")} + ${number(1)}; ${name("transforms", true)}${bracket("[")}${name("i")}${bracket("]")}; ${name("i")}++${bracket(") {", 2)}
			${name("list", true)}${bracket("[")}${name("i")} - ${number(1)}${bracket("]")} = ${name("list", true)}${bracket("[")}${name("i")}${bracket("]")}
			${name("transforms", true)}${bracket("[")}${name("i")}${bracket("]")} = ${number(0)}
		${bracket("}", 2)}
		${name("list", true)}${bracket("[", 2)}${name("i")} - ${number(1)}${bracket("]", 2)} = ${name("temp", true)}
	${bracket("}", 1)}
	${name("transforms", true)}${bracket("[", 1)}${name("from")}${bracket("]", 1)} = ${number(0)}
	${name("$transition$")} = ${declare("false")}
	,${bracket("(", 1)}${name("type")} === ${string("todo")} ? ${name("todo$", true)} : ${name("done$", true)} ${bracket(")", 1)}.${func("set")}${bracket("(", 1)}${name("list", true)}${bracket(")", 1)}
	,${bracket("(", 1)}${name("type")} === ${string("todo")} ? ${name("todoTf$", true)} : ${name("doneTf$", true)} ${bracket(")", 1)}.${func("set")}${bracket("(", 1)}${name("transforms", true)}${bracket(")", 1)}
${bracket("}")}
${func("onMount")}${bracket("(")}${bracket("()", 1)} ${declare("=>")} ${bracket("{", 1)}
	${name("$todo$")} = ${bracket("[", 2)}
		${string("Task A")},
		${string("Task B")},
		${string("Task C")},
		${string("Task D")},
		${string("Task E")},
		${string("Task F")},
		${string("Task G")},
		${string("Task H")},
		${string("Task I")},
		${string("Task J")},
		${string("Task K")},
		${string("Task L")},
		${string("")}
	${bracket("]", 2)}
	${name("$todoTf$")} = ${declare("new")} ${type("Array")}${bracket("(", 2)}${name("$todo$")}.${name("length")}${bracket(")", 2)}.${func("fill")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
	${name("$todo$")} = ${bracket("[", 2)} ${string("Task Z")}, ${string("")} ${bracket("]", 2)}
	${name("$doneTf$")} = ${declare("new")} ${type("Array")}${bracket("(", 2)}${name("$done$")}.${name("length")}${bracket(")", 2)}.${func("fill")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
${bracket("}", 1)}${bracket(")")}
${func("onDestroy")}${bracket("(")}${bracket("()", 1)} ${declare("=>")} ${bracket("{", 1)}
	${name("$todo$")} = ${bracket("[]", 2)}
	${name("$todoTf$")} = ${bracket("[]", 2)}
	${name("$done$")} = ${bracket("[]", 2)}
	${name("$doneTf$")} = ${bracket("[]", 2)}
	${name("$transition$")} = ${declare("false")}
	${name("$drag$")} = ${declare("null")}
${bracket("}", 1)}${bracket(")")}

`)}

${html("DragContainer", ` ${keyword("bind")}:${name("isDragging")}
		${keyword("bind")}:${func("setDragElement")}
		${keyword("on")}:${type("dragend")}=${bracket("{")}${func("handleDragend")}${bracket("}")}`, `
	${html("div", ` ${name("class")}=${string("flex flex-wrap=wrap")}`, `
		${html("div", ` ${name("class")}=${string("flex column")}`, `
			${html("span", ` ${name("class")}=${string("fs=2 bold")}`, "To do")}
			${html("div", ` ${name("class")}=${string("h=.5")}`, "")}
			${bracket("{")}#${keyword("each")} ${name("$todo$")} ${keyword("as")} ${name("v")}, ${name("i")}${bracket("}")}
			${html("DragItemForExample", ` ${keyword("bind")}:${name("clientHeight")}=${bracket("{")}${name("todoHeights", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}${bracket("}")}
					${bracket("{")}${func("setDragElement")}${bracket("}")}
					${name("list")}=${bracket("{")}${name("$todo$")}${bracket("}")}
					${name("transforms")}=${bracket("{")}${name("$todoTf$")}${bracket("}")}
					${name("list")}=${string("todo")}
					${name("index")}=${bracket("{")}${name("i")}${bracket("}")}
					${bracket("{")}${func("transferList")}${bracket("}")}
					${bracket("{")}${func("moveItem")}${bracket("}")}`, false)}
			${bracket("{")}/${keyword("each")}${bracket("}")}
			${bracket("{")}#${keyword("if")} ${name("$todo$")}.${name("length")} === ${number(1)}${bracket("}")}
			${html("DragItemPlaceHolderForExample", ` ${bracket("{")}${func("moveItem")}${bracket("}")}`, false)}
			${bracket("{")}/${keyword("if")}${bracket("}")}
		`)}
		${html("div", ` ${name("class")}=${string("w=5 h=5")}`, "")}
		${html("div", ` ${name("class")}=${string("flex column")}`, `
			${html("span", ` ${name("class")}=${string("fs=2 bold")}`, "Done")}
			${html("div", ` ${name("class")}=${string("h=.5")}`, "")}
			${bracket("{")}#${keyword("each")} ${name("$done$")} ${keyword("as")} ${name("v")}, ${name("i")}${bracket("}")}
			${html("DragItemForExample", ` ${keyword("bind")}:${name("clientHeight")}=${bracket("{")}${name("doneHeights", true)}${bracket("[", 1)}${name("i")}${bracket("]", 1)}${bracket("}")}
					${bracket("{")}${func("setDragElement")}${bracket("}")}
					${name("list")}=${bracket("{")}${name("$done$")}${bracket("}")}
					${name("transforms")}=${bracket("{")}${name("$doneTf$")}${bracket("}")}
					${name("list")}=${string("done")}
					${name("index")}=${bracket("{")}${name("i")}${bracket("}")}
					${bracket("{")}${func("transferList")}${bracket("}")}
					${bracket("{")}${func("moveItem")}${bracket("}")}`, false)}
			${bracket("{")}/${keyword("each")}${bracket("}")}
			${bracket("{")}#${keyword("if")} ${name("$done$")}.${name("length")} === ${number(1)}${bracket("}")}
			${html("DragItemPlaceHolderForExample", ` ${bracket("{")}${func("moveItem")}${bracket("}")}`, false)}
			${bracket("{")}/${keyword("if")}${bracket("}")}
		`)}
	`)}
`)}`
// DragItemForExample.svelte
const code2 = `

${html("script", ` ${name("lang")}=${string("ts")}`, `
${keyword("import")} ${name("Dragable")} ${keyword("from")} ${string("organs/@common/utils/Dragable.svelte")}
${keyword("import")} ${bracket("{")} ${name("drag$")}, ${name("transition$")} ${bracket("}")} ${keyword("from")} ${string("parts/ref/store")}

${keyword("export")} ${declare("let")} ${name("list")}: ${type("string")}${bracket("[]")}
${keyword("export")} ${declare("let")} ${name("transforms")}: ${type("number")}${bracket("[]")}
${keyword("export")} ${declare("let")} ${name("type")}: ${string("todo")} | ${string("done")}
${keyword("export")} ${declare("let")} ${name("index")}: ${type("number")}
${keyword("export")} ${declare("let")} ${name("clientHeight")}: ${type("number")}
${keyword("export")} ${declare("let")} ${name("duration")} = ${number(400)}
${keyword("export")} ${declare("let")} ${func("setDragElement")}: ${bracket("(")}${name("clientX")}: ${type("number")}, ${name("clientY")}: ${type("number")}, ${name("drag")}: ${type("HTMLElement")}${bracket(")")} ${declare("=>")} ${type("any")}
${keyword("export")} ${declare("let")} ${func("transferList")}: ${bracket("(")}${name("index")}: ${type("number")}${bracket(")")} ${declare("=>")} ${type("any")}
${keyword("export")} ${declare("let")} ${func("moveItem")}: ${bracket("(")}${name("index")}: ${type("number")}${bracket(")")} ${declare("=>")} ${type("any")}

${declare("const")} ${func("handleClick")} = ${bracket("()")} ${declare("=>")} ${bracket("{")}
	${func("alert")}${bracket("(", 1)}${bracket("(", 2)}${name("event")}.${name("target")} ${keyword("as")} ${type("HTMLElement")}${bracket(")", 2)}.${name("textContent")}${bracket(")", 1)}
${bracket("}")}
${declare("const")} ${func("handleDragenter")} = ${bracket("()")} ${declare("=>")} ${bracket("{")}
	${declare("const")} ${name("i", true)} = ${name("$drag$")}?.${name("index")}
	${declare("const")} ${name("t", true)} = ${name("$drag$")}?.${name("type")}
	${keyword("if")} ${bracket("(", 1)}${name("i", true)} === ${declare("undefined")} || ${name("i", true)} === ${name("index")} && ${name("t", true)} === ${name("type")}${bracket(") {", 1)}
		${keyword("return")}
	${bracket("}", 1)}
	${keyword("if")} ${bracket("(", 1)}${name("t", true)} === ${name("type")}${bracket(") {", 1)}
		${func("transferList")}${bracket("(", 2)}${name("index")}${bracket(")", 2)}
	${bracket("}", 1)} ${keyword("else")} ${bracket("{", 1)}
		${func("moveItem")}${bracket("(", 2)}${name("index")}${bracket(")", 2)}
	${bracket("}", 1)}
${bracket("}")}
${declare("const")} ${func("handleDragstart")} = ${bracket("()")} ${declare("=>")} ${bracket("{")}
	${name("$drag$")} = ${bracket("{", 1)} ${name("type: type")}, ${name("index: index")} ${bracket("}", 1)}
	${name("$transition$")} = ${declare("true")}
${bracket("}")}
`)}

${html("Dragable", ` ${keyword("on")}:${type("dragstart")}=${bracket("{")}${func("handleDragstart")}${bracket("}")}
		${name("delay")}=${bracket("{")}${number(300)}${bracket("}")}
		${bracket("{")}${func("setDragElement")}${bracket("}")}`, `
	${html("div", ` ${keyword("bind")}:${name("clientHeight")}
			${name("class")}=${string('"w=6 ol=.1_solid ta=center fs=2 cs=pointer tf=translateY(', false)}${bracket("{", 2)}${name("transforms")}${bracket("[")}${name("index")}${bracket("]")}${bracket("}", 2)}${string('px)', false)}
			${bracket("{", 2)}${name("$transition$")} ? ${string("tt=")} + ${name("duration")} + ${string("ms")} : ${string("")}${bracket("}", 2)}
			${bracket("{", 2)}${name("$drag$")}?.${name("index")} === ${name("index")} && ${name("$drag$")}?.${name("type")} === ${name("type")} ? ${string(" opacity=.2 ol=.2_solid_#aaa")} : ${string("")}${bracket("}", 2)}
			${bracket("{", 2)}!${name("list")}${bracket("[")}${name("index")}${bracket("]")} ? ${string("none")} : ${string("")}${bracket("}", 2)}
			${keyword("on")}:${type("dragenter")}=${bracket("{")}${func("handleDragenter")}${bracket("}")}`, `
		${bracket("{")}${name("list")}${bracket("[", 1)}${name("index")}${bracket("]", 1)}${bracket("}")}
	`)}
	${html("div", ` ${name("slot")}=${string("drag")}
			${keyword("bind")}:${name("clientHeight")}
			${name("class")}=${string("ta=center fs=2.5 cs=move c=#000 @dark@c=#fff")}`, `
		${bracket("{")}${name("list")}${bracket("[", 1)}${name("index")}${bracket("]", 1)} + ${string("!!")}${bracket("}")}
	`)}
`)}`
// DragItemPlaceHolderForExample.svelte
const code3 = `

${html("script", ` ${name("lang")}=${string("ts")}`, `
${keyword("import")} ${bracket("{")} ${name("drag$")} ${bracket("}")} ${keyword("from")} ${string("parts/ref/store")}

${keyword("export")} ${declare("let")} ${func("moveItem")}: ${bracket("(")}${name("index")}: ${type("number")}${bracket(")")} ${declare("=>")} ${type("any")}

${declare("const")} ${func("handleDragenter")} = ${bracket("()")} ${declare("=>")} ${bracket("{")}
	${declare("const")} ${name("i", true)} = ${name("$drag$")}?.${name("index")}
	${keyword("if")} ${bracket("(", 1)}${name("i", true)} === ${declare("undefined")}${bracket(") {", 1)}
		${keyword("return")}
	${bracket("}", 1)}
	${func("moveItem")}${bracket("(", 2)}${number(0)}${bracket(")", 2)}
${bracket("}")}
`)}

${html("div", ` ${name("style")}=${string("user-select:none")}
		${name("class")}=${string("w=6 ol=.1_dashed ta=center fs=2 cs=pointer")}
		${keyword("on")}:${type("dragenter")}=${bracket("{")}${func("handleDragenter")}${bracket("}")}`, `
	Empty
`)}`

const todoHeights: number[] = []
const doneHeights: number[] = []
let isDragging: boolean
let setDragElement: (clientX: number, clientY: number, drag: HTMLElement) => any

const handleDragend = () => {
	const from = $drag$!.index
	const type = $drag$!.type
	$drag$ = null
	reOrdering(from, type)
}
const transferList = (index: number) => {
	const from = $drag$!.index
	const type = $drag$!.type
	const transforms = [...(type === "todo" ? $todoTf$ : $doneTf$)]
	const heights = type === "todo" ? todoHeights : doneHeights
	if (from < index) {
		if (transforms[index]) {
			for (let i = index; transforms[i]; i++) {
				transforms[from] -= heights[i]
				transforms[i] = 0
			}
		} else {
			for (let i = index; !transforms[i]; i--) {
				transforms[from] += heights[i]
				transforms[i] = -heights[from]
			}
		}
	} else {
		if (transforms[index]) {
			for (let i = index; transforms[i]; i--) {
				transforms[from] += heights[i]
				transforms[i] = 0
			}
		} else {
			for (let i = index; !transforms[i]; i++) {
				transforms[from] -= heights[i]
				transforms[i] = heights[from]
			}
		}
	}
	(type === "todo" ? todoTf$ : doneTf$).set(transforms)
}
const moveItem = (index: number) => {
	const from = $drag$!.index
	const type = $drag$!.type
	if (type === "todo") {
		const before = [...$todo$]
		const after = [...$done$]
		after.splice(index, 0, before[from])
		before.splice(from, 1)
		$todo$ = before
		$done$ = after
		$todoTf$ = new Array(before.length).fill(0)
		$doneTf$ = new Array(after.length).fill(0)
		$drag$ = { type: "done", index: index }
		doneHeights.splice(index, 0, todoHeights[from])
		todoHeights.splice(from, 1)
	} else {
		const before = [...$done$]
		const after = [...$todo$]
		after.splice(index, 0, before[from])
		before.splice(from, 1)
		$done$ = before
		$todo$ = after
		$doneTf$ = new Array(before.length).fill(0)
		$todoTf$ = new Array(after.length).fill(0)
		$drag$ = { type: "todo", index: index }
		todoHeights.splice(index, 0, doneHeights[from])
		doneHeights.splice(from, 1)
	}
}
const reOrdering = (from: number, type: string) => {
	const transforms = [...(type === "todo" ? $todoTf$ : $doneTf$)]
	if (transforms[from] === 0) {
		return
	}
	const list = [...(type === "todo" ? $todo$ : $done$)]
	const temp = list[from]
	let i
	if (transforms[from] < 0) {
		for (i = from - 1; transforms[i]; i--) {
			list[i + 1] = list[i]
			transforms[i] = 0
		}
		list[i + 1] = temp
	} else {
		for (i = from + 1; transforms[i]; i++) {
			list[i - 1] = list[i]
			transforms[i] = 0
		}
		list[i - 1] = temp
	}
	transforms[from] = 0
	$transition$ = false
	;(type === "todo" ? todo$ : done$).set(list)
	;(type === "todo" ? todoTf$ : doneTf$).set(transforms)
}
onMount(() => {
	$todo$ = [
		"Task A",
		"Task B",
		"Task C",
		"Task D",
		"Task E",
		"Task F",
		"Task G",
		"Task H",
		"Task I",
		"Task J",
		"Task K",
		"Task L",
		""
	]
	$todoTf$ = new Array($todo$.length).fill(0)
	$done$ = [ "Task Z", "" ]
	$doneTf$ = new Array($done$.length).fill(0)
})
onDestroy(() => {
	$todo$ = []
	$todoTf$ = []
	$done$ = []
	$doneTf$ = []
	$transition$ = false
	$drag$ = null
})
</script>

<ComponentTabView>
	<DragContainer bind:isDragging
			bind:setDragElement
			on:dragend={handleDragend}>
		<div class="flex flex-wrap=wrap">
			<div class="flex column">
				<span class="fs=2 bold">To do</span>
				<div class="h=.5"></div>
				{#each $todo$ as v, i}
				<DragItemForExample bind:clientHeight={todoHeights[i]}
						{setDragElement}
						list={$todo$}
						transforms={$todoTf$}
						type="todo"
						index={i}
						{transferList}
						{moveItem} />
				{/each}
				{#if $todo$.length === 1}
				<DragItemPlaceHolderForExample {moveItem} />
				{/if}
			</div>
			<div class="w=5 h=5"></div>
			<div class="flex column">
				<span class="fs=2 bold">Done</span>
				<div class="h=.5"></div>
				{#each $done$ as v, i}
				<DragItemForExample bind:clientHeight={doneHeights[i]}
						{setDragElement}
						list={$done$}
						transforms={$doneTf$}
						type="done"
						index={i}
						{transferList}
						{moveItem} />
				{/each}
				{#if $done$.length === 1}
				<DragItemPlaceHolderForExample {moveItem} />
				{/if}
			</div>
		</div>
	</DragContainer>
	<div>
		<CodePage isCode>{@html code1}</CodePage>
		<div class="h=1"></div>
		<CodePage isCode>
			<IdeSvelte name="DragItemForExample" />
			{@html code2}
		</CodePage>
		<div class="h=1"></div>
		<CodePage isCode>
			<IdeSvelte name="DragItemPlaceHolderForExample" />
			{@html code3}
		</CodePage>
		<div class="h=1"></div>
		<CodePage isCode>
			<IdeTypescript name="store" />
			{@html
`

${keyword("import")} ${bracket("{")} ${name("writable")}, ${keyword("type")} ${name("Writable")} ${bracket("}")} ${keyword("from")} ${string("svelte/store")}

${keyword("export")} ${declare("const")} ${name("todo$", true)}: ${type("Writable")}${bracket("<")}${type("string")}${bracket("[]", 1)}${bracket(">")} = ${func("writable")}${bracket("(")}${bracket("[]", 1)}${bracket(")")}
${keyword("export")} ${declare("const")} ${name("todoTf$", true)}: ${type("Writable")}${bracket("<")}${type("number")}${bracket("[]", 1)}${bracket(">")} = ${func("writable")}${bracket("(")}${bracket("[]", 1)}${bracket(")")}
${keyword("export")} ${declare("const")} ${name("done$", true)}: ${type("Writable")}${bracket("<")}${type("string")}${bracket("[]", 1)}${bracket(">")} = ${func("writable")}${bracket("(")}${bracket("[]", 1)}${bracket(")")}
${keyword("export")} ${declare("const")} ${name("doneTf$", true)}: ${type("Writable")}${bracket("<")}${type("number")}${bracket("[]", 1)}${bracket(">")} = ${func("writable")}${bracket("(")}${bracket("[]", 1)}${bracket(")")}
${keyword("export")} ${declare("const")} ${name("transition$", true)} = ${func("writable")}${bracket("(")}${declare("false")}${bracket(")")}
${keyword("export")} ${declare("const")} ${name("drag$", true)}: ${type("Writable")}${bracket("<")}${bracket("{", 1)} ${name("type")}: ${string("todo")} | ${string("done")}, ${name("index")}: ${type("number")} ${bracket("}", 1)} | ${declare("null")}${bracket(">")} = ${func("writable")}${bracket("(")}${declare("null")}${bracket(")")}`
			}
		</CodePage>
	</div>
</ComponentTabView>