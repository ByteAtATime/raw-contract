<script lang="ts">
  import type { AbiItem } from "web3-utils";
  import ReadonlyMethod from "./ReadonlyMethod.svelte";

    export let contract: Contract;
    export let methods: AbiItem[];
</script>

<div>
    {#each methods as method}
        <ReadonlyMethod {contract} {method} />
    {/each}
</div>
