const lube = require("eslint-plugin-lube")
const { parser } = require("typescript-eslint")

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
	{
		...lube.configs,
		files: [
			"**/*.d.ts",
			"**/*.js",
			"**/*.json"
		],
		languageOptions: {
			ecmaVersion: "latest",
			parser,
			sourceType: "commonjs"
		}
	}
]