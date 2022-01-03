<script lang="ts">
  import { Modal } from 'spaper'
  import Loader from './Loader.svelte'
  import { showTxModal, pendingTx,
           txHash, txTitle } from '../store'
</script>

<Modal bind:active={$showTxModal}
       title={$txTitle}
       closeBtnText="Fermer">
  <Loader />
  {#if $pendingTx}
    <p>Transaction en cours</p>
    <a href={`https://ropsten.etherscan.io/tx/${$txHash}`}
       target="_blank"
       on:click={() => showTxModal.set(false)}>
       Voir sur l'explorateur ➚
    </a>
  {:else}
    <p>Confirmer la transaction dans votre wallet</p>
  {/if}
</Modal>
