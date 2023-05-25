<script lang="ts">
  import { goto } from "$app/navigation";

  let address = "";

  const submit = () => {
    if (!valid) return;

    goto(`/contract/${address}`);
  };

  $: valid = /^0x[0-9a-fA-F]{40}$/.test(address);
</script>

<form class="flex gap-x-4 justify-center my-4 items-start" on:submit|preventDefault={submit}>
  <div class="flex flex-col items-center">
    <input type="text" bind:value={address} class="text-lg px-3 py-2 border rounded-xl font-mono" />
    <p class="text-red-600 text-center" class:hidden={valid || address.length === 0}>
      Invalid address!
    </p>
  </div>
  <button class="text-lg rounded-xl px-3 py-2 bg-green-200 font-semibold tracking-wide">
    Load
  </button>
</form>
