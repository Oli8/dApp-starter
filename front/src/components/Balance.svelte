<script lang="ts">
  import { Badge } from 'spaper'

  export let amount: number = 0

  $: formattedAmount = amount?.toLocaleString('fullwide', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
</script>

<Badge type="secondary">
  {formattedAmount}
  <img src="eth.png" alt="ethers" />
</Badge>

<style lang="scss">
img {
  all: initial;
  width: 20px;
  vertical-align: bottom;
}
</style>
