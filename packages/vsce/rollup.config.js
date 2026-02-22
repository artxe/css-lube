const { nodeResolve } = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs").default

module.exports = {
	input: "src/index.js",
	plugins: [ commonjs(), nodeResolve() ],
	output: {
		file: "out/index.cjs",
		format: "cjs"
	}
}