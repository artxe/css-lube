import lube from "eslint-plugin-lube"
import { parser } from "typescript-eslint"

/** @type {import("eslint").Linter.Config[]} */
export default [
	{ ignores: [ "**/*.min.js" ] },
	{
		...lube.configs,
		files: [ "**/*.d.ts", "**/*.js", "**/*.mjs", "**/*.json" ],
		languageOptions: { ecmaVersion: "latest", parser, sourceType: "module" },
		rules: {
			"prefer-const": "off",
			"lube/pretty-sequence": [ "error", { "maxLength": 50 } ],
			"no-undef": "off",
			"no-unused-vars": "off"
		}
	}
]