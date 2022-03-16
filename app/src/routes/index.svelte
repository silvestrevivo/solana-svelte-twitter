<script lang="ts">
	import { fade } from 'svelte/transition';
	import TweetCard from '$lib/TweetCard.svelte';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import type { PublicKey } from '@solana/web3.js';

	let tweets = [];

	async function fetchAllTweets() {
		const tweetAccounts = await $workSpace.program.account.tweet.all();
		tweets = tweetAccounts;
	}

	async function removeTweet(publicKey: PublicKey) {
		await $workSpace.program.rpc.deleteTweet({
			accounts: {
				tweet: publicKey,
				author: $workSpace.provider.wallet.publicKey
			}
		});
		fetchAllTweets();
	}

	async function makeFavorite(publicKey: PublicKey) {
		await $workSpace.program.rpc.makeFavorite({
			accounts: {
				tweet: publicKey
			}
		});
		fetchAllTweets();
	}

	$: $workSpace?.program && fetchAllTweets();
</script>

<div class="space-y-8">
	<h2 class="text-primary-content text-2xl font-bold">Tweeter feed</h2>
	{#each tweets as { account, publicKey }, i (publicKey.toString())}
		<div in:fade={{ duration: 200, delay: i * 100 }}>
			<TweetCard
				{account}
				{publicKey}
				editable
				on:remove={() => removeTweet(publicKey)}
				on:fav={() => makeFavorite(publicKey)}
			/>
		</div>
	{:else}
		<div class="py-8">There are no tweets yet...</div>
	{/each}
</div>
