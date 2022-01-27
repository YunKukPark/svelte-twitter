<script>
	import { createComment, createLike, getUser } from '$lib/services';
	import Error from '$lib/Error.svelte';

	export let id,
		user,
		content,
		likes = 0,
		comments = [],
		publicURL = null;

	let commentContent = '';

	let createCommentPromise = Promise.resolve({});

	const addComment = () => {
		createCommentPromise = createComment({
			post: id,
			user: getUser().email,
			content: commentContent
		}).then(({ data, error }) => {
			comments = [...data, ...comments];
			return { data, error };
		});
	};

	const addLike = () => {
		likes += 1;
		createLike({ post: id, user: getUser().email });
	};
</script>

<article class="card shadow-sm mt-8">
	{#if publicURL}
		<figure>
			<img src={publicURL} />
		</figure>
	{/if}
	<div class="card-body">
		<h2 class="card-title">{user} says...</h2>
		<p>{content}</p>
		<div class="card-actions flex justify-between">
			{#await createCommentPromise}
				Posting comment....
			{:then { data, error }}
				<Error {error} />
				{#if data}
					Thanks for creating an comment!
				{:else if error}
					<strong class="text-red-500">{error}</strong>
				{/if}
				<form class="form-control" on:submit|preventDefault={addComment}>
					<div class="flex space-x-2">
						<input
							bind:value={commentContent}
							type="text"
							class="w-full input input-primary input-bordered"
						/>
					</div>
				</form>
			{/await}

			<button on:click={addLike} class="btn btn-secondary"
				>{likes} {likes === 1 ? 'Like' : 'Likes'}</button
			>
		</div>
		{#each comments as comment}
			{comment.user} says... <q>{comment.content}</q>
		{/each}
	</div>
</article>
