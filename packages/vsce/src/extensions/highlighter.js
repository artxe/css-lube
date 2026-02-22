const vscode = require("vscode")

const compile_style = require("../helper/compile_style.js")
const parse_dom = require("../helper/parse_dom.js")

/**
 * @param {vscode.ExtensionContext} context
 * @returns {void}
 */
module.exports = context => {
	const decorator = vscode.window.createTextEditorDecorationType
	/** @type {NodeJS.Timeout | 0} */
	let timeout
	let active_editor = vscode.window.activeTextEditor

	const token_regex = /(?<=^| |\t)[^ \r\t]+/g
	const token_decorator = decorator({})
	const media_query_decorator = decorator(
		{
			border: "solid #b67bb177",
			borderWidth: "0 0 3px 0"
		}
	)
	const selector_decorator = decorator(
		{
			border: "solid #d7ba7d77",
			borderWidth: "0 0 3px 0"
		}
	)
	const property_decorator = decorator(
		{
			border: "solid #9cdcfe77",
			borderWidth: "0 0 3px 0"
		}
	)
	const value_decorator = decorator(
		{
			border: "solid #ce917877",
			borderWidth: "0 0 3px 0"
		}
	)
	/**
	 * @param {string} cname
	 * @param {number} index
	 * @returns {boolean}
	 */
	const check_is_special = (cname, index) => {
		const c = /** @type {string} */(cname[index])/**/
		return c != "-" && (c < "a" || c > "z")
	}
	/**
	 * @param {string} text
	 * @param {*} str_node
	 * @param {{ start: number, text: string }[]} class_names
	 * @returns {void}
	 */
	function analysis_class_name(text, str_node, class_names) {
		let index = str_node.start + 1
		for (const script of str_node.scripts) {
			if (script.start > index) {
				class_names.push(
					{
						text: text.slice(index, script.start),
						start: index
					}
				)
			}
			for (const string of script.strings) {
				analysis_class_name(text, string, class_names)
			}
			index = script.end
		}
		if (index < str_node.end - 1) {
			class_names.push(
				{
					text: text.slice(index, str_node.end - 1),
					start: index
				}
			)
		}
	}
	/**
	 * @param {string} text
	 * @param {*} node
	 * @param {{ text: string, start: number }[]} class_names
	 * @returns {void}
	 */
	function dfs_ast(text, node, class_names) {
		if (node.type == "Element") {
			for (const attr of node.attributes) {
				if (attr.name == "class" || attr.name == "className" || attr.name == "classs") {
					if (typeof attr.value != "boolean") {
						if (attr.value.type == "String") {
							analysis_class_name(text, attr.value, class_names)
						} else {
							for (const string of attr.value.strings) {
								analysis_class_name(text, string, class_names)
							}
						}
					}
				}
			}
			for (const child of node.children) {
				dfs_ast(text, child, class_names)
			}
		}
	}
	async function update_decorations() {
		if (!active_editor) return
		const text = active_editor.document.getText()
		const ast = parse_dom(
			active_editor.document.fileName,
			text
		)
		/** @type {vscode.DecorationOptions[]} */
		const cname_array = []
		/** @type {vscode.Range[]} */
		const media_query_array = []
		/** @type {vscode.Range[]} */
		const selector_array = []
		/** @type {vscode.Range[]} */
		const property_array = []
		/** @type {vscode.Range[]} */
		const value_array = []
		/** @type {{ text: string, start: number }[]} */
		const class_names = []
		for (const node of ast) {
			dfs_ast(text, node, class_names)
		}
		/** @type {RegExpExecArray?} */
		let match
		for (const {
			text: class_name,
			start: class_name_index
		} of class_names) {
			while ((match = token_regex.exec(class_name))) {
				const cname = match[0]
				const style = compile_style(cname)
				if (!style) continue
				const cname_index = class_name_index + match.index
				const cname_start = active_editor.document.positionAt(cname_index)
				const cname_end = active_editor.document.positionAt(cname_index + cname.length)
				let parse_index = 0
				if (cname[0] == "@") {
					const index = cname.indexOf("@", 2)
					if (index >= 0) {
						const media_query_start = active_editor.document.positionAt(cname_index)
						const media_query_end = active_editor.document.positionAt(cname_index + index + 1)
						media_query_array.push(
							new vscode.Range(
								media_query_start,
								media_query_end
							)
						)
						parse_index = index + 1
					}
				}
				if (check_is_special(cname, parse_index)) {
					const index = cname.indexOf("/", parse_index + 1)
					if (index >= 0) {
						const selector_start = active_editor.document.positionAt(cname_index + parse_index)
						const selector_end = active_editor.document.positionAt(cname_index + index + 1)
						selector_array.push(
							new vscode.Range(selector_start, selector_end)
						)
						parse_index = index + 1
					}
				}
				/** @type {number[]} */
				const index_array = []
				let index = cname.indexOf("=", parse_index)
				if (index >= 0) {
					do {
						index_array.push(index)
						index = cname.indexOf("=", index + 1)
					} while (index >= 0)
				}
				index = cname.indexOf(";", parse_index)
				if (index >= 0) {
					do {
						index_array.push(index)
						index = cname.indexOf(";", index + 1)
					} while (index >= 0)
				}
				index_array.sort((a, b) => a - b)
				index = parse_index
				for (const i of index_array) {
					const range = new vscode.Range(
						active_editor.document.positionAt(cname_index + index),
						active_editor.document.positionAt(cname_index + i + 1)
					)
					if (cname[i] == "=") {
						property_array.push(range)
					} else {
						value_array.push(range)
					}
					index = i + 1
				}
				const range = new vscode.Range(
					active_editor.document.positionAt(cname_index + index),
					cname_end
				)
				value_array.push(range)
				const hover_message = new vscode.MarkdownString()
				hover_message.supportHtml = true
				hover_message.appendMarkdown(
					"**" + compile_style(cname) + "**"
				)
				cname_array.push(
					{
						range: new vscode.Range(cname_start, cname_end),
						hoverMessage: hover_message
					}
				)
			}
		}
		active_editor.setDecorations(token_decorator, cname_array)
		active_editor.setDecorations(
			media_query_decorator,
			media_query_array
		)
		active_editor.setDecorations(
			selector_decorator,
			selector_array
		)
		active_editor.setDecorations(
			property_decorator,
			property_array
		)
		active_editor.setDecorations(value_decorator, value_array)
	}
	function trigger_update_decorations(throttle = false) {
		if (timeout) {
			clearTimeout(timeout)
			timeout = 0
		}
		if (throttle) {
			timeout = setTimeout(update_decorations, 250)
		} else {
			update_decorations()
		}
	}
	if (active_editor) {
		trigger_update_decorations()
	}
	vscode.window.onDidChangeActiveTextEditor(
		editor => {
			active_editor = editor
			if (editor) {
				trigger_update_decorations()
			}
		},
		null,
		context.subscriptions
	)
	vscode.workspace.onDidChangeTextDocument(
		event => {
			if (active_editor && event.document === active_editor.document) {
				trigger_update_decorations(true)
			}
		},
		null,
		context.subscriptions
	)
}