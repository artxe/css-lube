const vscode = require("vscode")
const {
	shorthand_for_media_condition,
	shorthand_for_properties,
	shorthand_for_values
} = require("../helper/get_config.js")
const parse_dom = require("../helper/parse_dom.js")

/**
 * @param {vscode.ExtensionContext} context
 * @returns {void}
 */
module.exports = context => {
	/**
	 * @param {vscode.TextDocument} document
	 * @param {vscode.Position} position
	 * @returns {boolean | void}
	 */
	function is_in_class_name(document, position) {
		const text = document.getText()
		let index = 0
		for (let i = 0; i < position.line; i++) {
			while (text.charAt(index++) !== "\n");
		}
		const ast = parse_dom(
			document.fileName,
			text.slice(0, index + position.character)
		)
		const last_node = ast[ast.length - 1]
		if (!last_node) return
		if (last_node.type != "Element" || !last_node.attributes.length) return
		const last_attr = last_node.attributes[last_node.attributes.length - 1]
		return last_attr.name == "class" || last_attr.name == "className" || last_attr.name == "classs"
	}
	const selector = [ "*" ]
	const trigger_characters = [ "\"", "'", " ", "/", ";" ]

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			selector,
			{
				/**
				 * @param {vscode.TextDocument} document
				 * @param {vscode.Position} position
				 * @returns {vscode.ProviderResult<vscode.CompletionItem[]>}
				 */
				provideCompletionItems(document, position) {
					if (is_in_class_name(document, position)) {
						const keys = [ ...shorthand_for_properties ].map(
							([ k, v ]) => {
								const comp = new vscode.CompletionItem(v + ":?")
								comp.insertText = k + "="
								comp.kind = vscode.CompletionItemKind.EnumMember
								comp.detail = `${k}= * * * shorthand_for_properties of click-css`
								comp.sortText = v
								return comp
							}
						)
						const values = [ ...shorthand_for_values ].map(
							([ k, v ]) => {
								const comp = new vscode.CompletionItem(v)
								comp.insertText = k
								comp.kind = vscode.CompletionItemKind.Value
								comp.detail = `${k} * * * shorthand_for_values of click-css`
								comp.sortText = v
								return comp
							}
						)
						return [ ...keys, ...values ]
					}
				}
			},
			...trigger_characters
		),
		vscode.languages.registerCompletionItemProvider(
			selector,
			{
				/**
				 * @param {vscode.TextDocument} document
				 * @param {vscode.Position} position
				 * @returns {vscode.ProviderResult<vscode.CompletionItem[]>}
				 */
				provideCompletionItems(document, position) {
					if (is_in_class_name(document, position)) {
						const medias = [
							...shorthand_for_media_condition
						].map(
							([ k, v ]) => {
								const comp = new vscode.CompletionItem("@media " + v)
								comp.insertText = "@" + k + "@"
								comp.kind = vscode.CompletionItemKind.Constructor
								comp.detail = `@${k}@ * * * shorthand_for_media_condition of click-css`
								comp.sortText = v
								comp.command = {
									"command": "editor.action.triggerSuggest",
									"title": "Re-trigger completions..."
								}
								return comp
							}
						)
						return [ ...medias ]
					}
				}
			},
			...trigger_characters
		)
	)
}