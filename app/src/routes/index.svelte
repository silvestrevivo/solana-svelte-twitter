<script lang="ts">
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
	{#each tweets as { account: { author, content, topic, timestamp }, publicKey } (publicKey.toString())}
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{topic}</h2>
				<p class="my-4">{content}</p>
				<div class="card-actions justify-between items-center">
					<div class="badge badge-outline">
						{author.toString().slice(0, 4) + '..' + author.toString().slice(-4)}
					</div>
					<div class="badge badge-primary badge-outline">
						{timestamp}
					</div>

					<div class="flex items-center gap-4">
						<!-- heart -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 fill-accent-focus cursor-pointer"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clip-rule="evenodd"
							/>
						</svg>
						<!-- remove -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 fill-accent-focus cursor-pointer"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
