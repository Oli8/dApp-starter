import type { Network } from '@ethersproject/networks';
import { derived, Readable, writable, Writable } from 'svelte/store';
import type { Address } from './helpers/eth-helper'
import { getConnectedWallet, getChain,
         provider, getEthBalance } from './helpers/eth-helper'

export const selectedAccount: Writable<Address> = writable(null);
export const userBalance: Writable<number> = writable(null);
export const chainId: Writable<number> = writable(null);
export const hasWallet: Writable<boolean> = writable(true);

export const showTxModal: Writable<boolean> = writable(false);
export const pendingTx: Writable<boolean> = writable(false);
export const txHash: Writable<Address> = writable(null);
export const txTitle: Writable<string> = writable('');

export const connected: Readable<boolean> = derived(
  selectedAccount,
  $selectedAccount => !!$selectedAccount
);
export const onRopsten: Readable<boolean> = derived(
  chainId,
  $chainId => $chainId === 3
);

(async () => {
  if (!window.ethereum) {
    hasWallet.set(false);
    return;
  }

  // Can't be done through provider as far as I know
  window.ethereum.on('accountsChanged', async ([account]) => {
    selectedAccount.set(account);
    userBalance.set(await getEthBalance(account));
  });
  provider.on('block', (_blockNumber) => {
    selectedAccount.subscribe(async (val) => {
      if (val)
        userBalance.set(await getEthBalance(val));
    });
  })
  provider.on('network', (_network: Network,
                          previousNetwork: Network) => {
    if (previousNetwork) {
      window.location.reload();
    }
  });

  selectedAccount.set(await getConnectedWallet());
  chainId.set(await getChain());
})()
