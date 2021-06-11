<script lang="ts">
let text = "World"
import {Circle} from "svelte-loading-spinners"
</script>

<span>Hello, {text}!</span>

<Circle />
<style>
span {
	font-size: 3em;
}
</style>