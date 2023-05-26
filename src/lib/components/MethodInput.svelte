<script lang="ts">
  import { TYPE_TO_NAME, TYPE_TO_PATTERN } from "$lib/solidity";
  import type { AbiInput } from "web3-utils";

  export let input: AbiInput;
  export let data = "";
</script>

<div class="flex flex-row items-center mt-2">
  <p><span class="font-mono">{input.name}</span> ({TYPE_TO_NAME[input.type]})</p>

  <input
    type="text"
    class="ml-2 input input-ghost-secondary"
    placeholder={input.type === "address" ? "0x..." : ""}
    bind:value={data}
    pattern={TYPE_TO_PATTERN[input.type]}
  />

  {#if !new RegExp(TYPE_TO_PATTERN[input.type]).test(data)}
    <p class="text-error ml-2">Invalid input</p>
  {/if}
</div>
