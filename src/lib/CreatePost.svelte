<script>
	import { createPost, getUser } from '$lib/services';
	import Error from '$lib/Error.svelte';

	let postContent = '';

	let createPostPromise = Promise.resolve({});
	const handleCreatePost = () => {
		createPostPromise = createPost({ user: getUser().email, content: postContent });
	};
</script>

<form class="form-control" on:submit|preventDefault={handleCreatePost}>
	<label for="post" class="label">
		<span class="label-text text-xl">What would you like to qwit</span>
	</label>
	<textarea bind:value={postContent} id="post" required class="textarea h-24 textarea-bordered" />
	{#await createPostPromise}
		<button disabled class="btn">Qwit that Show it !</button>
	{:then { data, error }}
		<button class="btn">Qwit that Show it !</button>
		{#if data}
			<strong class="text-green-600">Successfully create post!</strong>
		{/if}
		<Error {error} />
	{/await}
</form>
