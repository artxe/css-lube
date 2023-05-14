const bracket = (() => {
	const colors = [ "blue", "--forest-green", "--copper-canyon" ]
	const darkColors = [ "--gold", "--bouquet", "--dotger-blue" ]
	return (bracket: string, depth?: number) => color(colors[depth || 0], darkColors[depth || 0], bracket)
})()

const closeTag = (tag: string) => {
	const tagColor = tag.charCodeAt(0) > 90 ? "--maroon" : "--jelly-bean"
	const darkTagColor = tag.charCodeAt(0) > 90 ? "--havelock-blue" : "--puerto-rico"
	return color("--maroon", "gray", "&lt;/") + color(tagColor, darkTagColor, tag) + color("--maroon", "gray", "&gt;")
}

const color = (color: string, dark: string, text: string) => `<span class="c=${color} @dark@c=${dark}">${text}</span>`

const css = (selector: string, ...properties: [string, string][]) => `${color("--maroon", "--straw", selector)}${bracket("{")}${properties.map(([key, value]) => `${color("red", "--anakiwa", key)}:${color("--endeavour", "--raw-sienna", value)}`).join(";")}${bracket("}")}`

const comment = (text: string) => color("--japanese-laurel", "--asparagus", escapeTag(text))

const declare = (text: string) => color("blue", "--havelock-blue", text)

const escapeTag = (html: string) => html.replace(/</g, "&lt;").replace(/>/g, "&gt;")

const func = (text: string) => color("--dallas", "--sapling", text)

const html = (tag: string, attr: string, child: string | false) => {
	const tagColor = tag.charCodeAt(0) > 90 ? "--maroon" : "--jelly-bean"
	const darkTagColor = tag.charCodeAt(0) > 90 ? "--havelock-blue" : "--puerto-rico"
	let text = color("--maroon", "gray", "&lt;")
			+ color(tagColor, darkTagColor, tag)
			+ attr
	if (child === false) {
		text += color("--maroon", "gray", " /&gt;")
	} else {
		text += color("--maroon", "gray", "&gt;")
		text += child
		text += color("--maroon", "gray", "&lt;/")
		text += color(tagColor, darkTagColor, tag)
		text += color("--maroon", "gray", "&gt;")
	}
	return text
}

const keyword = (text: string) => color("--electric-violet", "--bouquet", text)

const name = (text: string, final?: boolean) => final ? color("--lochmara", "--malibu", text) : color("--navy-blue", "--anakiwa", text)

const number = (number: number) => color("--salem", "--coriander", number.toString())

const openTag = (tag: string, attr: string) => {
	const tagColor = tag.charCodeAt(0) > 90 ? "--maroon" : "--jelly-bean"
	const darkTagColor = tag.charCodeAt(0) > 90 ? "--havelock-blue" : "--puerto-rico"
	return color("--maroon", "gray", "&lt;") + color(tagColor, darkTagColor, tag) + attr +  color("--maroon", "gray", "&gt;")
}

const string = (text: string, quote?: string | false) => {
	if (quote === false) {
		return color("--tamarillo", "--raw-sienna", text)
	}
	if (!quote) {
		quote = '"'  
	}
	return color("--tamarillo", "--raw-sienna", quote + text + quote)
}

const type = (text: string) => color("--jelly-bean", "--puerto-rico", text)
export {
	bracket,
	closeTag,
	color,
	comment,
	css,
	declare,
	escapeTag,
	func,
	html,
	keyword,
	name,
	number,
	openTag,
	string,
	type
}