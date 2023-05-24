<script lang="ts">
  import { BscScanApi } from "$lib/api";
  import ReadonlyMethodsList from "$lib/components/ReadonlyMethodsList.svelte";
  import { Contract } from "$lib/contract";
  import { onMount } from "svelte";
  import type { AbiItem } from "web3-utils";

  const contract = new Contract("0xeaf770a86002472230c66035e83fc10af92c9f24", new BscScanApi(""));

  let readonlyMethods: AbiItem[] | null = null;

  onMount(async () => {
    await contract.init();

    readonlyMethods = await contract.getReadonlyMethods();
  });
</script>

{#if readonlyMethods}
  <ReadonlyMethodsList {contract} methods={readonlyMethods} />
{:else}
  <p>Loading...</p>
{/if}
