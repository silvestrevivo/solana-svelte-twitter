<script lang="ts">
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	class="border-solid h-16 border-gray-300 border-b flex items-center px-4 gap-4 justify-between"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 stroke-primary-focus cursor-pointer md:hidden"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		on:click={() => dispatch('open')}
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
	</svg>
	<h1 class="text-primary-focus text-xl uppercase flex-1 hidden md:block">Anchor Svelte Twitter</h1>

	<WalletMultiButton />
</div>
