<script>
	import { createComment, createLike, getUser } from '$lib/services';

	export let id,
		user,
		content,
		likes = 0,
		comments = [],
		publicURL = null;

	const addLike = () => {
		likes += 1;
		createLike({ post: id, user: getUser().email });
	};
</script>

<article class="card shadow-sm bg-accent text-accent-content mt-7">
	{#if publicURL}
		<figure>
			<img src={publicURL} />
		</figure>
	{/if}
	<div class="card-body">
		<h2 class="card-title">{user} says...</h2>
		<p>{content}</p>
		<div class="card-actions flex justify-between items-center">
			<form class="form-control">
				<div class="flex space-x-2">
					<input
						type="text"
						placeholder="Your thoughts"
						class="w-full input input-primary input-bordered"
					/>
					<button class="btn btn-primary">Leave Comment</button>
				</div>
			</form>
			<button on:click={addLike} class="btn btn-secondary"
				>{likes} {likes === 1 ? 'Like' : 'Likes'}</button
			>
		</div>
	</div>
</article>
