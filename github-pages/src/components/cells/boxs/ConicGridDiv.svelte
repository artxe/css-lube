<script lang="ts">
import styles from "styles"
</script>

<div class="bg=--azure-66 ta=center {styles.background.grid}">
	<div class="bg=conic-gradient(from_45deg_at_67%_67%,--chambray-88,--chambray-22)
			@dark@bg=conic-gradient(from_-45deg_at_33%_67%,--firefly,--black-cc)">
		<div class="w=80% m=auto">
			<slot></slot>
		</div>
	</div>
</div>