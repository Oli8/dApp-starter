<script lang="ts">
  import { Badge } from 'spaper'

  export let amount: number
</script>

<Badge type="secondary">
  {amount}
  <img src="eth.png" alt="ethers" />
</Badge>

<style lang="scss">
img {
  all: initial;
  width: 20px;
  vertical-align: bottom;
}
</style>
