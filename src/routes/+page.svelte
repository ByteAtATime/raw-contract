<script lang="ts">
  import { BscScanApi } from "$lib/api";
  import ReadonlyMethodsList from "$lib/components/ReadonlyMethodsList.svelte";
  import { Contract } from "$lib/contract";
  import type { AbiItem } from "web3-utils";

  let contract: Contract | null = null;

  let readonlyMethods: AbiItem[] | null = null;
  let address = "";
  let loading = false;

  const updateAddress = async () => {
    loading = true;

    contract = new Contract(address, new BscScanApi(""));
    await contract.init();

    readonlyMethods = await contract.getReadonlyMethods();

    loading = false;
  };
</script>

<div class="flex gap-x-4 justify-center mb-8 mt-2">
  <input type="text" bind:value={address} class="text-lg px-3 py-2 border rounded-xl font-mono" />
  <button on:click={updateAddress} class="text-lg rounded-xl px-3 py-2 bg-green-200 font-semibold tracking-wide">Update</button>
</div>

{#if contract && readonlyMethods}
  <ReadonlyMethodsList {contract} methods={readonlyMethods} />
{:else if loading}
  <p>Loading...</p>
{/if}
