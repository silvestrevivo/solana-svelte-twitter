<script lang="ts">
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

	$: connection = $workSpace?.network && new Connection($workSpace.network, 'confirmed');

	let balance = null;

	async function getBalance(walletStore) {
		let wallet = walletStore.publicKey;
		balance = (await connection.getBalance(wallet)) / LAMPORTS_PER_SOL;
	}

	async function airdrop() {
		let airdropSignature = await connection.requestAirdrop(
			$walletStore.publicKey,
			LAMPORTS_PER_SOL
		);
		await connection.confirmTransaction(airdropSignature);
		getBalance($walletStore);
	}

	$: connection && $walletStore?.publicKey && getBalance($walletStore);
</script>

{#if $walletStore.connected && balance !== null && balance < 0.1}
	<button class="btn btn-outline btn-accent" on:click={airdrop}>Balance SOL = {balance}</button>
{/if}
