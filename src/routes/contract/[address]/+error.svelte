<script lang="ts">
    import { page } from '$app/stores';
  import { CHAIN_TO_NAME } from '$lib/api';
  import Searchbar from '$lib/components/Searchbar.svelte';
</script>

<Searchbar />

{#if $page.error?.message === "Contract source code not verified"}
    <div class="flex flex-col items-center md:w-2/3 mx-auto text-center gap-y-2">
        <h1 class="text-3xl font-bold">Contract not found</h1>
        <p>Contract address: {$page.params.address}</p>
        <p class="text-lg mt-4 font-bold">Possible reasons:</p>
        <p>You're on the <span class="font-semibold">{CHAIN_TO_NAME[$page.error.chain]}</span>, but the contract is on another chain</p>
        <p>The contract was deployed recently and the source code is not verified yet</p>
        <p>The owner hasn't verified the source code</p>
        <p>This is not a contract address</p>
    </div>
{:else}
    <h1>Unknown error</h1>
    <p>{$page.error?.message}</p>
{/if}
