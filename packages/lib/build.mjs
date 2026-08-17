import { readFileSync, writeFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import { minify } from "terser"

/** Every file the minified bundle is published to. */
const targets = [ "./min.js", "../../docs/min.js" ]

const url = /** @param {string} path */ path => new URL(path, import.meta.url)
const { version } = JSON.parse(readFileSync(url("./package.json"), "utf8"))
const source = readFileSync(url("./click-css.js"), "utf8")

if (!source.includes(`"v${version}"`)) {
	throw Error(
		`click-css.js does not stamp "v${version}" — package.json and setAttribute("click", …) disagree`
	)
}

const { code } = await minify(
	source,
	{
		module: true,
		compress: { booleans_as_integers: true },
		mangle: {},
		output: {},
		parse: {}
	}
)
if (!code) throw Error("terser returned no code")

for (const target of targets) writeFileSync(url(target), code)

console.log(
	`click-css v${version}  ${code.length} B  (${gzipSync(code).length} B gzip)\n`
	+ targets.map(t => "  -> " + t).join("\n")
)
