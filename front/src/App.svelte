<script lang="ts">
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import { NotificationDisplay } from '@beyonk/svelte-notifications';
  import TxModal from './components/TxModal.svelte'
  import { Navbar, Button } from 'spaper'
  import ConnectButton from './components/ConnectButton.svelte'
</script>

<Navbar>
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
  </ul>
</Navbar>

<NotificationDisplay timeout={5000} />
<TxModal />

<main class="paper">
  <Router {routes} />
</main>

<style>
:global(.split-nav a.paper-btn) {
  display: inline;
}
</style>
