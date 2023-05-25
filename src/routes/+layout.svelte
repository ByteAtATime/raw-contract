<script>
  import "../app.css";

  import { navigating } from "$app/stores";
  import { Circle2 } from "svelte-loading-spinners";
</script>

{#if $navigating}
  <div class="flex min-h-screen items-center justify-center scale-[200%]">
    <Circle2 />
  </div>
{:else}
  <slot />
{/if}
