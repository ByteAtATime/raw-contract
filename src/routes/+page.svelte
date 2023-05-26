<script>
  import Searchbar from "$lib/components/Searchbar.svelte";
  import { getContractName, getDefaultChain, getFavorites, setDefaultChain } from "$lib/storage";

  const favorites = getFavorites();

  let chain = getDefaultChain();
</script>

<Searchbar />

<div class="flex justify-center">
  <select class="select select-ghost-secondary" bind:value={chain} on:change={() => setDefaultChain(chain)}>
    <option value="bsc">Binance Smart Chain</option>
    <option value="eth">Ethereum</option>
    <option value="matic">Polygon</option>
  </select>
</div>

<div class="flex flex-col items-center mt-4">
  <h1 class="font-bold text-4xl">Favorites</h1>

  <div class="flex flex-col gap-y-3 mt-2 w-1/2">
    {#each favorites as favorite}
      <a href="/contract/{favorite}" class="btn btn-secondary">{getContractName(favorite)}</a>
    {/each}
  </div>
</div>
