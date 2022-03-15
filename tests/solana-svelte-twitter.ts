import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolanaSvelteTwitter } from '../target/types/solana_svelte_twitter';

describe('solana-svelte-twitter', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaSvelteTwitter as Program<SolanaSvelteTwitter>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
