<script lang="ts">
	import Balance from '$lib/Balance.svelte';
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { createEventDispatcher } from 'svelte';
	import hamburger from '../icons/hamburger.svg?src';

	const dispatch = createEventDispatcher();
</script>

<div
	class="border-solid h-16 border-gray-300 border-b flex items-center px-4 gap-4 justify-between"
>
	<span on:click={() => dispatch('open')} class="cursor-pointer open lg:hidden">
		{@html hamburger}
	</span>
	<h1 class="text-primary-focus text-xl uppercase flex-1 hidden md:block">Anchor Svelte Twitter</h1>

	<Balance />
	<WalletMultiButton />
</div>

<style lang="postcss">
	:global(.open svg) {
		@apply h-6 w-6 stroke-primary-focus;
	}
</style>
