"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function getClassName(document, position) {
    const text = document.getText();
    let index = 0;
    for (let i = 0; i < position.line; i++) {
        while (text.charAt(index++) !== '\n')
            ;
    }
    return /(?<=class=|className=)'[-+=:;*/.,()!@#%"\w\t\r\n \\]*$|(?<=class=|className=)"[-+=:;*/.,()!@#%'\w\t\r\n \\]*$/
        .exec(text.slice(0, index + position.character))?.[0];
}
const shorthandKeys = new Map(vscode.workspace.getConfiguration()
    .get("instant-css.custom.shorthandKeys"));
const shorthandValues = new Map(vscode.workspace.getConfiguration()
    .get("instant-css.custom.shorthandValues"));
const shorthandMedias = new Map(vscode.workspace.getConfiguration()
    .get("instant-css.custom.shorthandMedias"));
const selector = ["html", "javascriptreact", "svelte", "typescriptreact", "vue"];
const triggerCharacters = [`"`, "'", " ", "/", ";"];
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, {
        provideCompletionItems(document, position, token, context) {
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
    }, ...triggerCharacters), vscode.languages.registerCompletionItemProvider(selector, {
        provideCompletionItems(document, position, token, context) {
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
    }, ...triggerCharacters), vscode.languages.registerCompletionItemProvider(selector, {
        provideCompletionItems(document, position, token, context) {
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
    }, ...triggerCharacters));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map