<script context="module">
	import { getPosts } from '$lib/services';
	export async function load() {
		const { data, error } = await getPosts();
		return {
			props: {
				posts: data,
				error
			}
		};
	}
</script>

<script>
	import CreatePost from '$lib/CreatePost.svelte';
	import Post from '$lib/Post.svelte';
	import Error from '$lib/Error.svelte';

	export let posts, error;
</script>

<header class="flex justify-between">
	<h1 class="text-2xl">Welcome to Qwitter</h1>
	<button class="btn">Logout</button>
</header>
<CreatePost />

<Error {error} />

{#each posts || [] as post}
	<Post {...post} />
{/each}
