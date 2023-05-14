<script lang="ts">
export let name: string
export let json: string

json = json.replace(/,/g, s => "<x1>" + s + "</x1>")
		.replace(/(^\[)|(]$)/g, s => "<x2>" + s + "</x2>")
		.replace(/\[|]/g, s => "<x2>" + s + "</x2>")
		.replace(/\/\*.+?\*\//g, s => "<x3>" + s + "</x3>")
		.replace(/\/\/.*\n/g, s => "<x3>" + s + "</x3>")
</script>

<pre>{
	""
	}<span class="c=blue @dark@c=--havelock-blue">let</span>{
		" "
	}<span class="c=--navy-blue @dark@c=--anakiwa">{name}</span>{
		" = "
	}<span class="c=blue @dark@c=--havelock-blue">new</span>{
		" "
	}<span class="c=--jelly-bean @dark@c=--puerto-rico">Map</span>{
		""
	}<span class="c=--copper-canyon @dark@c=--dotger-blue">{"("}</span>{
		""
	}<span class="c=--tamarillo @dark@c=--raw-sienna
			>x1/c=#000 @dark@>x1/c=--white-dd
			>x2/c=--forest-green @dark@>x2/c=--bouquet
			>x2>x2/c=blue @dark@>x2>x2/c=--gold
			>x3/c=--japanese-laurel @dark@>x3/c=--asparagus">{@html
		json
	}</span>{
	""
	}<span class="c=--dotger-blue">{")"}</span>{
	""
}</pre>