<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import TweetCard from '$lib/TweetCard.svelte';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { notificationStore } from '../stores/nofitications';
	import type { PublicKey } from '@solana/web3.js';

	let tweets = [];

	async function fetchAllTweets() {
		const tweetAccounts = await $workSpace.program.account.tweet.all();
		tweets = tweetAccounts;
	}

	async function removeTweet(publicKey: PublicKey) {
		try {
			await $workSpace.program.rpc.deleteTweet({
				accounts: {
					tweet: publicKey,
					author: $workSpace.provider.wallet.publicKey
				}
			});
			notificationStore.set({ type: 'success' });
		} catch (error) {
			notificationStore.set({ type: 'error' });
		}

		fetchAllTweets();
	}

	async function makeFavorite(publicKey: PublicKey) {
		try {
			await $workSpace.program.rpc.makeFavorite({
				accounts: {
					tweet: publicKey
				}
			});
			notificationStore.set({ type: 'success' });
		} catch (error) {
			notificationStore.set({ type: 'error' });
		}
		fetchAllTweets();
	}

	$: $workSpace?.program && fetchAllTweets();
</script>

<div class="space-y-8">
	<h2 class="text-primary-content text-2xl font-bold">Tweeter feed</h2>
	{#each tweets as { account, publicKey }, i (publicKey.toString())}
		<div in:fade={{ duration: 200, delay: i * 100 }} animate:flip={{ duration: 500 }}>
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
