<script lang="ts">
  import type { Contract } from "$lib/contract";
  import type { AbiItem } from "web3-utils";
  import MethodInput from "./MethodInput.svelte";

  export let contract: Contract;
  export let method: AbiItem;

  const inputs = method.inputs!!;
  const outputs = method.outputs!!;
  const constant = inputs.length === 0;

  const data = Array(inputs.length).fill("");

  let result: any | null = null;
  let error: string | null = null;

  const execute = async () => {
    result = null;
    error = null;

    try {
      result = await contract.readMethod(method, ...data);
    } catch (e: any) {
      error = e.message;
    }
  };
</script>

<div class="accordion">
  <input type="checkbox" id="accordion-{method.name}" class="accordion-toggle" />
  <label for="accordion-{method.name}" class="accordion-title font-mono">{method.name}</label>
  <div class="accordion-content">
    <div class="min-h-0">
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
          class="btn btn-primary mt-2">Execute</button
        >

        {#if result != null}
          {#if typeof result === "object"}
            {#each Object.entries(result) as [key, value]}
              {#if !/^\d+$/.test(key)}
                {#if outputs.find((it) => it.name === key)?.type === "address"}
                  <p class="font-mono mt-2">
                    {key}:
                    <a
                      href="https://bscscan.com/address/{value}"
                      target="_blank"
                      class="text-blue-600">{value}</a
                    >
                  </p>
                {:else}
                  <p class="font-mono mt-2">{key}: {value}</p>
                {/if}
              {/if}
            {/each}
          {:else}
            <p class="font-mono mt-2">{result}</p>
          {/if}
        {/if}

        {#if error}
          <p class="font-mono mt-2 text-red-600">{error}</p>
        {/if}
      {/if}
    </div>
  </div>
</div>
