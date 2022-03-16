<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { notificationStore } from '../stores/nofitications';
	import error from '../icons/error.svg?src';
	import success from '../icons/success.svg?src';

	setTimeout(() => {
		notificationStore.set(null);
	}, 3000);
</script>

<div
	class="fixed bottom-10 right-10 h-8 w-full max-w-lg"
	in:fly={{ duration: 300, x: 200 }}
	out:fade={{ duration: 1000 }}
>
	{#if $notificationStore?.type === 'error'}
		<div class="alert alert-error shadow-lg">
			<div>
				{@html error}
				<span>Error! Task failed when you tried connect with the chain</span>
			</div>
		</div>
	{:else if $notificationStore?.type === 'success'}
		<div class="alert alert-success shadow-lg">
			<div>
				{@html success}
				<span>Your transaction has been confirmed!</span>
			</div>
		</div>
	{/if}
</div>
