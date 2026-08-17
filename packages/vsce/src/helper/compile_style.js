const {
	default_unit,
	shorthand_for_media_condition,
	shorthand_for_properties,
	shorthand_for_values
} = require("./get_config")

const RE = RegExp
const declaration_gap = "; "
const replace_default_unit_inner_regex = /\([^)]*\)|(?:^| )-?(?:\d*\.)?\d+(?= |$)/g
// eslint-disable-next-line max-len
const replace_default_unit_regex = /((?:^|;|-)(?:block|border|bottom|gap|grid-template-(?:columns|rows)|(?<!line-)height|inline|inset(?:-[a-z]+)*|left|(?:margin|padding)(?:-[a-z]+)*|outline|radius|right|shadow|size|spacing|top|(?<!stroke-)width):)(.+?)(?=;|$)/g
const check_has_value_regex = RE(
	".[:=].|"
	+ [ ...shorthand_for_values.keys() ].join("|")
)
const replace_and_regex = /&/g
const escape_less_than_regex = /</g
const replace_colon_regex = /\\?=/g
const replace_condition_regex = /[^ ,]+(?<![<>=])=[^ ,]+/g
const replace_media_condition_regex = RE(
	"(^| )("
	+ [
		...shorthand_for_media_condition.keys()
	].join("|")
	+ ")(?= |$)",
	"g"
)
const replace_shorthand_regex = RE(
	"(^|/|;)(?:("
	+ [
		...shorthand_for_properties.keys()
	].join("|")
	+ ")(?=:)|("
	+ [ ...shorthand_for_values.keys() ].join("|")
	+ ")(?=;|!|$))",
	"g"
)
const replace_space_regex = /\\?_/g
const replace_var_regex = /\([^)]*\)|[: ,]--[^ ;,)]+|(?<=[: ,])~(?=[-.\d])/g

/**
 * @param {string} cname
 * @returns {boolean}
 */
const check_is_raw = cname => {
	const c = /** @type {string} */(cname[0])/**/
	return c == "-" || c >= "a" && c <= "z"
}
/**
 * @param {string} cname
 * @returns {string | number | boolean}
 */
const check_is_open = cname => {
	let quote = ""
	let depth = 0
	for (let i = 0; i < cname.length; i++) {
		const c = cname[i]
		if (c == "\\") i++
		else if (quote) quote = c == quote ? "" : quote
		else if (c == "'" || c == "\"") quote = c
		else if (c == "(" || c == "[") depth++
		else if (c == ")" || c == "]") depth--
	}
	return quote || depth || cname[cname.length - 1] == "\\"
}
/**
 * @param {string} cname
 * @returns {string}
 */
const compile_media = cname => {
	const i = cname.indexOf("@", 2)
	const query = cname.slice(1, i)
	const name = cname.slice(i + 1)
	return parse_query(query) + "&nbsp;&nbsp;&nbsp;&nbsp;"
		+ get_priority(name)
		+ (check_is_raw(name)
			? "<span style=\"color:#d7ba7d;\">&</span> " + compile_raw(name)
			: compile_special(name))
		+ "<br>}"
}
/**
 * @param {string} cname
 * @returns {string}
 */
const compile_raw = cname => "{ " + parse_value(cname).join(declaration_gap) + " }"
/**
 * @param {string} cname
 * @returns {string}
 */
const compile_special = cname => {
	const i = get_selector_end(cname)
	const selector = i < 0
		? ""
		: cname.slice(0, i).replace(
			replace_space_regex,
			replace_space_handler
		)
			.replace(escape_less_than_regex, "&lt;")

	return `<span style="color:#d7ba7d;">&${selector}</span> { ${
		parse_value(cname.slice(i + 1)).join(declaration_gap)
	} }`
}
/**
 * @param {string} cname
 * @returns {string}
 */
const get_priority = cname => {
	let index = cname.length - 1
	if (cname[index] != "!") return ""
	let prefix = "[class]"
	while (cname[--index] == "!") prefix += "[class]"
	return prefix ? `<span style="color:#d7ba7d;">${prefix}</span> ` : ""
}
/**
 * @param {string} cname
 * @returns {number}
 */
const get_selector_end = cname => {
	let quote = ""
	let depth = 0
	for (let i = 0; i < cname.length; i++) {
		const c = cname[i]
		if (c == "\\") i++
		else if (quote) quote = c == quote ? "" : quote
		else if (c == "'" || c == "\"") quote = c
		else if (c == "(" || c == "[") depth++
		else if (c == ")" || c == "]") depth--
		else if (c == "/" && !depth) return i
	}
	return -1
}
/**
 * @param {string} substr
 * @returns {string}
 */
const parse_condition = substr => {
	const i = substr.indexOf("=")
	return "(" + substr.slice(0, i) + ":" + substr.slice(i + 1) + ")"
}
/**
 * @param {string} query
 * @returns {string}
 */
const parse_query = query => {
	const char = query[0]
	query = char == "@"
		? query.slice(1)
		: "media " + query
	return `<span style="color:#b67bb1;">@${
		query.replace(replace_space_regex, replace_space_handler)
			.replace(replace_and_regex, " and ")
			.replace(replace_condition_regex, parse_condition)
			.replace(replace_media_condition_regex, replace_media_handler)
			.replace(escape_less_than_regex, "&lt;")
	}</span> {<br>`
}
/**
 * @param {string} cname
 * @returns {string[]}
 */
const parse_value = cname => {
	let i = cname.length
	if (cname[--i] == "!") {
		while (cname[--i] == "!");
		cname = cname.slice(0, i + 1)
	}
	return colorize(
		cname.replace(
			replace_space_regex,
			replace_space_handler
		)
			.replace(
				replace_colon_regex,
				replace_colon_handler
			)
			.replace(
				replace_shorthand_regex,
				replace_shorthand_handler
			)
			.replace(
				replace_default_unit_regex,
				replace_shorthand_unit_handler
			)
			.replace(
				replace_var_regex,
				replace_var_handler
			)
	)
}
/**
 * @param {string} css
 * @returns {string[]}
 */
const colorize = css => {
	/** @type {string[]} */
	const out = []
	let quote = ""
	let depth = 0
	let start = 0
	let colon = -1
	for (let i = 0; i <= css.length; i++) {
		const c = css[i]
		if (i == css.length || c == ";" && !depth && !quote) {
			out.push(
				colorize_declaration(
					css.slice(start, i),
					colon - start
				)
			)
			start = i + 1
			colon = -1
		} else if (c == "\\") i++
		else if (quote) quote = c == quote ? "" : quote
		else if (c == "'" || c == "\"") quote = c
		else if (c == "(" || c == "[") depth++
		else if (c == ")" || c == "]") depth--
		else if (c == ":" && !depth && colon < 0) colon = i
	}
	return out
}
/**
 * @param {string} decl
 * @param {number} i
 * @returns {string}
 */
const colorize_declaration = (decl, i) => i < 0
	? decl.replace(escape_less_than_regex, "&lt;")
	: `<span style="color:#9cdcfe;">${decl.slice(0, i)}</span>: `
		+ `<span style="color:#ce9178;">${
			decl.slice(i + 1).replace(escape_less_than_regex, "&lt;")
		}</span>`
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_colon_handler = substr => substr.length > 1 ? "=" : ":"
/**
 * @param {string} _
 * @param {string} lookbehind
 * @param {string} substr
 * @returns {string}
 */
const replace_media_handler = (_, lookbehind, substr) => lookbehind + shorthand_for_media_condition.get(substr)
/**
 * @param {string} _
 * @param {string} lookbehind
 * @param {string} property
 * @param {string} value
 * @returns {string}
 */
// eslint-disable-next-line max-len
const replace_shorthand_handler = (_, lookbehind, property, value) => lookbehind + (property ? shorthand_for_properties.get(property) : shorthand_for_values.get(value))
/**
 * @param {string} _
 * @param {string} lookbehind
 * @param {string} substr
 * @returns {string}
 */
const replace_shorthand_unit_handler = (_, lookbehind, substr) => lookbehind + (substr[0] == "~"
	? substr.slice(1)
	: substr.replace(
		replace_default_unit_inner_regex,
		replace_shorthand_unit_inner_handler
	))
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_shorthand_unit_inner_handler = substr => substr[0] == "(" ? substr : substr + default_unit
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_space_handler = substr => substr.length > 1 ? "_" : " "
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_var_handler = substr => substr[0] == "("
	? substr
	: substr[0] == "~" ? "" : substr[0] + "var(" + substr.slice(1) + ")"

/**
 * @param {string} cname
 * @returns {string}
 */
module.exports = cname => {
	return check_has_value_regex.test(cname) && !check_is_open(cname)
		? check_is_raw(cname)
			? get_priority(cname) + compile_raw(cname)
			: cname[0] == "@"
				? compile_media(cname)
				: get_priority(cname) + compile_special(cname)
		: ""
}
module.exports.get_selector_end = get_selector_end