<script lang="ts">
  import { navigating } from "$app/stores";
  import ReadonlyMethodsList from "$lib/components/ReadonlyMethodsList.svelte";
  import Searchbar from "$lib/components/Searchbar.svelte";
  import type { Contract } from "$lib/contract";
  import type { AbiItem } from "web3-utils";

  export let data: { contract: Contract; readonlyMethods: AbiItem[] };

  const { contract, readonlyMethods } = data;
</script>

<Searchbar />

<ReadonlyMethodsList {contract} methods={readonlyMethods} />
