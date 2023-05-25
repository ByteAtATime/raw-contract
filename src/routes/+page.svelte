<script>
  import Searchbar from "$lib/components/Searchbar.svelte";
  import { getContractName, getFavorites } from "$lib/storage";

  const favorites = getFavorites();
</script>

<Searchbar />

<h1 class="font-bold text-4xl">Favorites</h1>

<div class="flex flex-col gap-y-3 mt-2">
  {#each favorites as favorite}
    <a href="/contract/{favorite}">
      <div class="bg-green-200 px-4 py-2 rounded-xl">
        <h2 class="text-xl font-bold font-mono">{getContractName(favorite)}</h2>
      </div>
    </a>
  {/each}
</div>
