<script lang="ts">
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import { userReady, userBalance } from './store'
  import TxModal from './components/TxModal.svelte'
  import { Navbar, Button } from 'spaper'
  import ConnectButton from './components/ConnectButton.svelte'
  import Balance from './components/Balance.svelte'
</script>

<Navbar class="padding">
  <h3 slot="brand">
    <a href="/#/">dApp Starter</a>
  </h3>
  <ul class="inline">
    <li>
      <Button outline="secondary"
              href="/#/some-page">
        Some link
      </Button>
    </li>
    <li>
      <Button outline="warning"
              href="/#/some-other-page">
        Some other link
      </Button>
    </li>
    <li>
      <ConnectButton />
    </li>
    {#if $userReady}
      <li>
        <Balance amount={$userBalance} />
      </li>
    {/if}
  </ul>
</Navbar>

<TxModal />

<main class="paper">
  <Router {routes} />
</main>

<style lang="scss">
:global(body) {
  background-color: dimgrey;
}
</style>
