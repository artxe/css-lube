<script>
import CodePage from "organs/@common/utils/CodePage.svelte"
import { html, name, string } from "ts/highlighter"
import GithubStars from "organs/GithubStars.svelte"

const code = `${html("div", ` ${name("class")}=${string(`>div>a/br=.75
		_*/f=blue
		_.c\\=\\#333/c=blue`)}`, `
	${html("GithubStars", "", false)}
`)}
`
</script>

<CodePage>{@html code}
	<div class=">div>a/br=.75
				_*/f=blue
				_.c\=\#333/c=blue">
		<GithubStars />
	</div>
</CodePage>