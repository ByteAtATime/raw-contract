<script lang="ts">
  import Fa from "svelte-fa";
  import { faPencil, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
  import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
  import ReadonlyMethodsList from "$lib/components/ReadonlyMethodsList.svelte";
  import Searchbar from "$lib/components/Searchbar.svelte";
  import type { Contract } from "$lib/contract";
  import type { AbiItem } from "web3-utils";
  import { getContext } from "svelte";
  import type { Open } from "svelte-simple-modal";
  import RenameContract from "$lib/components/modals/RenameContract.svelte";
  import { getContractName, isFavorite, toggleFavorite } from "$lib/storage";
  import { CHAIN_TO_NAME } from "$lib/api";

  export let data: { contract: Contract; readonlyMethods: AbiItem[]; chain: string };

  const { contract, readonlyMethods, chain } = data;

  const { open } = getContext("simple-modal") as { open: Open };

  const rename = () => {
    open(RenameContract, { address: contract.address });
  };

  const changeFavorite = () => {
    toggleFavorite(contract.address, chain);
    favorite = !favorite;
  };

  let favorite = isFavorite(contract.address, chain);
</script>

<Searchbar />

<h1 class="text-3xl font-bold">
  Contract <span class="font-mono ml-1 tracking-wide">{getContractName(contract.address)}</span> on {CHAIN_TO_NAME[
    chain
  ]}
</h1>

<div class="flex mb-4 gap-x-2">
  <button class="btn btn-secondary btn-circle" on:click={rename}
    ><Fa icon={faPencil} size="lg" /></button
  >
  <button class="btn btn-secondary btn-circle" on:click={changeFavorite}
    ><Fa icon={favorite ? faStarSolid : faStarOutline} size="lg" /></button
  >
</div>

<ReadonlyMethodsList {contract} methods={readonlyMethods} />
