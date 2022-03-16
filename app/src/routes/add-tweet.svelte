<script lang="ts">
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { web3 } from '@project-serum/anchor';
	import { goto } from '$app/navigation';
	import { notificationStore } from '../stores/nofitications';

	let topic = '',
		content = '';

	const addTweet = async () => {
		const tweet = web3.Keypair.generate();

		try {
			await $workSpace.program.rpc.sendTweet(topic, content, {
				accounts: {
					tweet: tweet.publicKey,
					author: $workSpace.provider.wallet.publicKey,
					systemProgram: $workSpace.systemProgram.programId
				},
				signers: [tweet]
			});

			notificationStore.set({ type: 'success' });

			topic = '';
			content = '';
			goto('/');
		} catch (error) {
			console.log('Error', error);
			notificationStore.set({ type: 'error' });
		}
	};
</script>

<h2 class="text-primary-content text-2xl font-bold mb-6">Add your tweet</h2>
<form class="space-y-4" on:submit|preventDefault={addTweet}>
	<div class="form-control w-full max-w-2xl">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Topic</span>
		</label>
		<input
			type="text"
			placeholder="Type your topic here"
			class="input input-bordered w-full max-w-2xl"
			bind:value={topic}
		/>
	</div>

	<div class="form-control max-w-2xl">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Your content</span>
		</label>
		<textarea
			class="textarea textarea-bordered h-24 resize-none"
			placeholder="Type your content here"
			bind:value={content}
		/>
	</div>
	<button class="btn btn-active btn-primary" type="submit">submit tweet</button>
</form>
