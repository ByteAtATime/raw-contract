<script lang="ts">
  import type { Contract } from "$lib/contract";
  import { TYPE_TO_NAME, TYPE_TO_PATTERN } from "$lib/solidity";
  import type { AbiItem } from "web3-utils";
  import MethodInput from "./MethodInput.svelte";

  export let contract: Contract;
  export let method: AbiItem;

  const inputs = method.inputs!!;
  const outputs = method.outputs!!;
  const constant = inputs.length === 0;

  const data = Array(inputs.length).fill("");

  let result: any | null = null;

  const execute = async () => {
    result = await contract.readMethod(method, ...data);
  };
</script>

<details class="bg-teal-100/50 rounded-lg p-4 mb-4">
  <summary class="font-mono">{method.name}</summary>

  {#if constant}
    {#await contract.readMethod(method) then result}
      {#if outputs[0].type === "address"}
        <a
          href="https://bscscan.com/address/{result}"
          target="_blank"
          class="font-mono text-blue-600">{result}</a
        >
      {:else}
        <p class="font-mono">{result}</p>
      {/if}
    {/await}
  {:else}
    {#each inputs as input, i}
      <MethodInput {input} bind:data={data[i]} />
    {/each}

    <button
      on:click={execute}
      class="bg-green-200 px-3 py-2 rounded-lg mt-4 font-semibold tracking-wide">Execute</button
    >

    {#if result}
      <p class="font-mono mt-2">{result}</p>
    {/if}
  {/if}
</details>
