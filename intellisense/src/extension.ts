import * as vscode from "vscode";

function getClassName(document: vscode.TextDocument, position: vscode.Position) {
	const text = document.getText();
	let index = 0;
	for (let i = 0; i < position.line; i++) {
		while (text.charAt(index++) !== '\n');
	}
	return /(?<=class=|className=)'[-+=:;*/.,()!@#%"\w\t\r\n \\]*$|(?<=class=|className=)"[-+=:;*/.,()!@#%'\w\t\r\n \\]*$/
		.exec(text.slice(0, index + position.character))?.[0];
}
const shorthandKeys = new Map(
	vscode.workspace.getConfiguration()
			.get("instant-css.custom.shorthandKeys") as [string, string][]
);
const shorthandValues = new Map(
	vscode.workspace.getConfiguration()
			.get("instant-css.custom.shorthandValues") as [string, string][]
);
const shorthandMedias = new Map(
	vscode.workspace.getConfiguration()
			.get("instant-css.custom.shorthandMedias") as [string, string][]
);
const selector = ["html", "javascriptreact", "svelte", "typescriptreact", "vue"];
const triggerCharacters = [`"`, "'", " ", "/", ";"];
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(selector, {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
				const className = getClassName(document, position);
				if (className != null && /(?:^.|[ ;/@])$/.test(className)) {
					const keys = [...shorthandKeys].map(([k, v]) => {
						const comp = new vscode.CompletionItem(v + ":?");
						comp.insertText = k + "=";
						comp.kind = vscode.CompletionItemKind.EnumMember;
						comp.detail = `${k}= * * * shorthandKeys of instant-css`;
						comp.sortText = v;
						return comp;
					});
					return [...keys];
				}
			}
		}, ...triggerCharacters),
		vscode.languages.registerCompletionItemProvider(selector, {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
				const className = getClassName(document, position);
				if (className != null && /(?:^.|[ ;/@])$/.test(className)) {
					const values = [...shorthandValues].map(([k, v]) => {
						const comp = new vscode.CompletionItem(v);
						comp.insertText = k;
						comp.kind = vscode.CompletionItemKind.Value;
						comp.detail = `${k} * * * shorthandValues of instant-css`;
						comp.sortText = v;
						return comp;
					});
					return [...values];
				}
			}
		}, ...triggerCharacters),
		vscode.languages.registerCompletionItemProvider(selector, {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
				const className = getClassName(document, position);
				if (className != null && /(?:^.| )$/.test(className)) {
					const medias = [...shorthandMedias].map(([k, v]) => {
						const comp = new vscode.CompletionItem("@media " + v);
						comp.insertText = "@" + k + "@";
						comp.kind = vscode.CompletionItemKind.Constructor;
						comp.detail = `@${k}@ * * * shorthandMedias of instant-css`;
						comp.sortText = v;
						comp.command = {
							"command": "editor.action.triggerSuggest",
							"title": "Re-trigger completions..."
						};
						return comp;
					});
					return [...medias];
				}
			}
		}, ...triggerCharacters),
	);
}
