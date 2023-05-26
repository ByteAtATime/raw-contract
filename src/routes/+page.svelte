<script>
  import Searchbar from "$lib/components/Searchbar.svelte";
  import { getContractName, getFavorites } from "$lib/storage";

  const favorites = getFavorites();
</script>

<Searchbar />

<div class="flex flex-col items-center">
  <h1 class="font-bold text-4xl">Favorites</h1>

  <div class="flex flex-col gap-y-3 mt-2 w-1/2">
    {#each favorites as favorite}
      <a href="/contract/{favorite}" class="btn btn-secondary">{getContractName(favorite)}</a>
    {/each}
  </div>
</div>
