<script lang="ts">
  import { Button } from 'spaper'
  import { selectedAccount, connected,
           onRopsten, hasWallet } from '../store'
  import type { Address } from '../helpers/eth-helper';
  import { connectWallet } from '../helpers/eth-helper'

  async function connectHandler() {
    const address: Address = await connectWallet();
    selectedAccount.set(address);
  }

  $: truncatedAddress = (
    $connected ?
      $selectedAccount.substring(0, 4) + '...'
      + $selectedAccount.substring($selectedAccount.length-4)
    : ''
  )
</script>

<Button outline="secondary" on:click={connectHandler}
        disabled={!$hasWallet || !$onRopsten}>
  {#if !$hasWallet}
    Installez Metamask pour vous connecter
  {:else if !$onRopsten}
    Mauvais reseau, passer sur Ropsten pour profiter de nos services
  {:else}
    {truncatedAddress || 'Connexion'}
  {/if}
</Button>
