<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { getUser, signIn } from '$lib/services';
	import Error from '$lib/Error.svelte';

	// redirect if already loged in
	const user = getUser();
	if (browser && user) goto('/');

	let email = 'a01043340999@gmail.com';

	let signInPromise = Promise.resolve();
	function handleSignIn() {
		signInPromise = signIn({ email });
	}
</script>

{#await signInPromise}
	Sending magic link to {email}
{:then { data, error }}
	<Error {error} />
	{#if data}
		<strong class="text-green-600">Success</strong>
	{:else}
		<form class="form-control" on:submit|preventDefault={handleSignIn}>
			<label for="email" class="label justify-center">
				<span class=" label-text text-4xl">Login to Qwitter</span>
			</label>
			<div class="relative">
				<input
					id="email"
					name="email"
					type="email"
					bind:value={email}
					placeholder="Email"
					required
					class="w-full pr-16 input input-primary input-bordered"
				/>
				<button class="absolute top-0 right-0 rounded-l-none btn btn-primary">Get Magic Link</button
				>
			</div>
		</form>
	{/if}
{/await}
