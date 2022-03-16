<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider } from '@svelte-on-solana/wallet-adapter-anchor';
	import idl from '../../../target/idl/solana_svelte_twitter.json';
	import '../app.css';

	const localStorageKey = 'walletAdapter';
	const network = 'http://127.0.0.1:8899';

	let wallets,
		checked = false;

	onMount(async () => {
		const { PhantomWalletAdapter, SolflareWalletAdapter } = await import(
			'@solana/wallet-adapter-wallets'
		);

		wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
	});

	function openDrawer() {
		checked = true;
	}
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<AnchorConnectionProvider {network} {idl} />
<div class="h-screen drawer drawer-mobile w-full">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content flex flex-col bg-base-200">
		<Header on:open={openDrawer} />
		<main class="h-full overflow-y-scroll">
			{#if $walletStore?.connected}
				<slot />
			{:else}
				<div class="h-full flex items-center justify-center">
					<div class="text-center">
						<p class="font-bold text-primary-content text-xl">Your wallet is not connected</p>
					</div>
				</div>
			{/if}
		</main>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<div class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<div class="border-solid h-12 border-gray-300 border-b">
				<h1 class="text-primary-focus text-xl uppercase flex-1 md:hidden">Anchor Svelte Twitter</h1>
			</div>
			<ul class="py-4 space-y-4">
				<li><a href="/">Home</a></li>
				<li><a href="add-tweet">Add tweet</a></li>
				<li><a href="filter-by-user">Filter by user</a></li>
			</ul>
		</div>
	</div>
</div>
