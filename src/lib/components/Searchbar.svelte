<script lang="ts">
  import { goto } from "$app/navigation";
  import { getDefaultChain } from "$lib/storage";

  let address = "";

  const submit = () => {
    if (!valid) return;

    goto(`/contract/${address}?chain=${getDefaultChain()}`);
  };

  $: valid = /^0x[0-9a-fA-F]{40}$/.test(address);
</script>

<form class="flex gap-x-4 justify-center my-4 items-start" on:submit|preventDefault={submit}>
  <div class="flex flex-col items-center">
    <input type="text" bind:value={address} class="input input-ghost-primary" placeholder="0x..." />
    <p
      class="text-error mt-2 text-center"
      class:hidden={valid || address.length === 0}
    >
      Invalid address!
    </p>
  </div>
  <button class="btn btn-primary"> Load </button>
</form>
