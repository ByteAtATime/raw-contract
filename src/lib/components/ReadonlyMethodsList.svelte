<script lang="ts">
  import type { AbiItem } from "web3-utils";
  import ReadonlyMethod from "./ReadonlyMethod.svelte";
  import type { Contract } from "$lib/contract";

    export let contract: Contract;
    export let methods: AbiItem[];
</script>

<div>
    {#each methods as method}
        <ReadonlyMethod {contract} {method} />
    {/each}
</div>
