const { parseHtml, parseJsx } = require("dom-eater")

/**
 * @param {string} file_name
 * @param {string} text
 * @returns {*[]}
 */
module.exports = (file_name, text) => {
	const index = file_name.lastIndexOf(".")
	if (index < 0) return []
	const extension = file_name.slice(index + 1)
	if (extension == "jsx" || extension == "tsx") return parseJsx(text).ast
	return parseHtml(text).ast
}