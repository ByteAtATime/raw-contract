<script lang="ts">
  import Fa from "svelte-fa";
  import { faPencil } from "@fortawesome/free-solid-svg-icons"
  import ReadonlyMethodsList from "$lib/components/ReadonlyMethodsList.svelte";
  import Searchbar from "$lib/components/Searchbar.svelte";
  import type { Contract } from "$lib/contract";
  import type { AbiItem } from "web3-utils";
  import { getContext } from "svelte";
  import type { Open } from "svelte-simple-modal"
  import RenameContract from "$lib/components/modals/RenameContract.svelte";
  import { getContractName } from "$lib/storage";

  export let data: { contract: Contract; readonlyMethods: AbiItem[] };

  const { contract, readonlyMethods } = data;

  const { open } = getContext("simple-modal") as { open: Open };

  const rename = () => {
    open(RenameContract, { address: contract.address })
  }
</script>

<Searchbar />

<h1 class="text-3xl font-bold">
  Contract <span class="font-mono ml-1 tracking-wide">{getContractName(contract.address)}</span>
</h1>

<div class="flex mb-4">
  <button class="bg-green-200 p-2 rounded-lg" on:click={rename}><Fa icon={faPencil} size="lg" /></button>
</div>

<ReadonlyMethodsList {contract} methods={readonlyMethods} />
