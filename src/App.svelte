<script lang="ts">
	let text = "World";

	import Home from "./Home.svelte";
	import Exam from "./Exam.svelte";
	import { Router, Route } from "svelte-navigator";
	const routes = [
		{ path: "/", component: Home },
		{ path: "/exam", component: Exam },
	];
</script>

<Router>
	{#each routes as { path, component }}
		<Route path="{path}">
			<svelte:component this="{component}" />
		</Route>
	{/each}
</Router>

<style>
	span {
		font-size: 3em;
	}
</style>
