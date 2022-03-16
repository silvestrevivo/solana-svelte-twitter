<script lang="ts">
	import { fade } from 'svelte/transition';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import TweetCard from '$lib/TweetCard.svelte';

	let address = '',
		areTweets = false,
		tweets = [];

	async function fetchAllTweets() {
		const tweetAccounts = await $workSpace.program.account.tweet.all();
		areTweets = tweetAccounts.length > 0;
	}

	async function filterTweets() {
		if (address) {
			const tweetAccounts = await $workSpace.program.account.tweet.all([
				{
					memcmp: {
						offset: 8,
						bytes: address
					}
				}
			]);
			tweets = tweetAccounts;
		}
	}

	$: $workSpace?.program && fetchAllTweets();
</script>

<div class="space-y-8">
	<h2 class="text-primary-content text-2xl font-bold">Filter by user</h2>
</div>

{#if areTweets}
	<form class="space-y-4" on:submit|preventDefault={filterTweets}>
		<div class="form-control w-full max-w-2xl">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Topic</span>
			</label>
			<input
				type="text"
				placeholder="Type the solana user address here"
				class="input input-bordered w-full max-w-2xl"
				bind:value={address}
				on:keydown={() => (tweets = [])}
			/>
		</div>

		<button class="btn btn-active btn-primary" type="submit">filter tweets</button>
	</form>
{:else}
	<div class="py-8">There are no tweets yet...</div>
{/if}

<div class="space-y-8 mt-8">
	{#each tweets as { account, publicKey }, i (publicKey.toString())}
		<div in:fade={{ duration: 200, delay: i * 100 }}>
			<TweetCard {account} {publicKey} />
		</div>
	{/each}
</div>
