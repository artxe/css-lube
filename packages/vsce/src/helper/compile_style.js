const {
	default_unit,
	shorthand_for_media_condition,
	shorthand_for_properties,
	shorthand_for_values
} = require("./get_config")

const RE = RegExp
const replace_default_unit_inner_regex = /(?:^| )-?(?:\d*\.)?\d+(?= |$)/g
// eslint-disable-next-line max-len
const replace_default_unit_regex = /((?:^|;|-)(?:border|bottom|end|font-size|gap|grid-template-(?:columns|rows)|height|inset|left|(?:margin|padding)(?:-[a-z]+)*|outline|radius|right|shadow|spacing|start|top|width):)(.+?)(?=;|$)/g
const check_has_value_regex = RE(
	".[:=].|"
	+ [ ...shorthand_for_values.keys() ].join("|")
)
const replace_and_regex = /&/g
const replace_colon_regex = /=/g
const replace_calc_oper_inner_regex = /[^ (][+-][^ ]/g
const replace_calc_oper_regex = /calc\(.+?\)/g
const replace_condition_regex = /[^ ,]+=[^ ,]+/g
const replace_media_condition_regex = RE(
	"(^| )("
	+ [
		...shorthand_for_media_condition.keys()
	].join("|")
	+ ")(?= |$)",
	"g"
)
const replace_properties_regex = RE(
	"(^|/|;)("
	+ [
		...shorthand_for_properties.keys()
	].join("|")
	+ ")(?=:)",
	"g"
)
const replace_space_regex = /_/g
const replace_var_regex = /[: ,]--[^ ;,)]+/g
const replace_value_regex = RE(
	"(^|/|;)("
	+ [ ...shorthand_for_values.keys() ].join("|")
	+ ")(?=;|!|$)",
	"g"
)

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
 * @returns {number | boolean}
 */
const check_is_open = cname => {
	let quote = 0
	let db_quote = 0
	let paren = 0
	for (const c of cname) {
		if (c == "'") quote++
		else if (c == "\"") db_quote++
		else if (c == "(") paren++
		else if (c == ")") paren--
	}
	return quote % 2 || db_quote % 2 || paren || cname[cname.length - 1] == "\\"
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
		+ get_priority(name) + (check_is_raw(name) ? compile_raw : compile_special)(name)
		+ "<br>}"
}
/**
 * @param {string} cname
 * @returns {string}
 */
const compile_raw = cname => "{ " + parse_value(cname) + " }"
/**
 * @param {string} cname
 * @returns {string}
 */
const compile_special = cname => {
	const i = cname.indexOf("/")
	// eslint-disable-next-line max-len
	return `<span style="color:#d7ba7d;">&${cname.slice(0, i).replace(replace_space_regex, " ")}</span> { ${parse_value(cname.slice(i + 1))} }`
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
		query.replace(replace_space_regex, " ")
			.replace(replace_and_regex, " and ")
			.replace(replace_condition_regex, parse_condition)
			.replace(replace_media_condition_regex, replace_media_handler)
	}</span> {<br>`
}
/**
 * @param {string} cname
 * @returns {string}
 */
const parse_value = cname => {
	let i = cname.length
	if (cname[--i] == "!") {
		while (cname[--i] == "!");
		cname = cname.slice(0, i + 1)
	}
	return cname.replace(replace_space_regex, " ")
		.replace(replace_colon_regex, ":")
		.replace(
			replace_properties_regex,
			replace_property_handler
		)
		.replace(
			replace_value_regex,
			replace_value_handler
		)
		.replace(
			replace_default_unit_regex,
			replace_shorthand_unit_handler
		)
		.replace(
			replace_calc_oper_regex,
			replace_calc_oper_handler
		)
		.replace(
			replace_var_regex,
			replace_var_handler
		)
		.replace(
			replace_value_color_regex,
			replace_value_color_handler
		)
		.replace(
			replace_semi_gap_regex,
			"span>; <span"
		)
}
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_calc_oper_handler = substr => substr.replace(
	replace_calc_oper_inner_regex,
	replace_calc_oper_inner_handler
)
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_calc_oper_inner_handler = substr => substr[0] + " " + substr[1] + " " + substr[2]
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
 * @param {string} substr
 * @returns {string}
 */
const replace_property_handler = (_, lookbehind, substr) => lookbehind + shorthand_for_properties.get(substr)
/**
 * @param {string} _
 * @param {string} lookbehind
 * @param {string} substr
 * @returns {string}
 */
const replace_shorthand_unit_handler = (_, lookbehind, substr) => lookbehind + substr.replace(
	replace_default_unit_inner_regex,
	replace_shorthand_unit_inner_handler
)
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_shorthand_unit_inner_handler = substr => substr + default_unit
/**
 * @param {string} _
 * @param {string} lookbehind
 * @param {string} substr
 * @returns {string}
 */
const replace_value_handler = (_, lookbehind, substr) => lookbehind + shorthand_for_values.get(substr)
/**
 * @param {string} substr
 * @returns {string}
 */
const replace_var_handler = substr => substr[0] + "var(" + substr.slice(1) + ")"

const replace_semi_gap_regex = /span>;<span/g
const replace_value_color_regex = /(?<=^|;)(.+?):(.+?)(?=;|$)/g
/**
 * @param {string} _
 * @param {string} p
 * @param {string} v
 * @returns {string}
 */
// eslint-disable-next-line max-len
const replace_value_color_handler = (_, p, v) => `<span style="color:#9cdcfe;">${p}</span>: <span style="color:#ce9178;">${v}</span>`
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