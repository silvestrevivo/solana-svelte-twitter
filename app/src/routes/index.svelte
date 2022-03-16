<script lang="ts">
	import TweetCard from '$lib/TweetCard.svelte';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';

	let tweets = [];

	async function fetchAllTweets() {
		const tweetAccounts = await $workSpace.program.account.tweet.all();
		tweets = tweetAccounts;
	}

	$: $workSpace?.program && fetchAllTweets();
</script>

<div class="space-y-8">
	<h2 class="text-primary-content text-2xl font-bold">Tweeter feed</h2>
	{#each tweets as { account, publicKey } (publicKey.toString())}
		<TweetCard {account} {publicKey} editable />
	{/each}
</div>
