<script lang="ts">
  import { setContractName } from "$lib/storage";

  export let address: string;

  let name = address;

  const submit = () => {
    setContractName(address, name);
    window.location.reload();
  };
</script>

<div class="bg-white rounded-lg p-4">
  <h1 class="text-2xl font-bold mb-4">Rename contract</h1>
  <form class="flex flex-col" on:submit|preventDefault={submit}>
    <label class="mb-2">
      <span class="text-gray-700">New Name</span>
      <input
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-2 py-1"
        type="text"
        bind:value={name}
      />
    </label>
    <button
      class="bg-green-200 p-2 rounded-lg mt-4 font-semibold disabled:bg-gray-300 opacity-75"
      type="submit"
      disabled={!name}
    >
      Rename
    </button>
  </form>
</div>
