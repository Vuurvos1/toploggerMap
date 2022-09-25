<script>
  import { getGymData } from '../modules/fetchGymData.js';
  import {
    gyms,
    gym as gymStore,
    routes as routeStore,
    mapSvg,
  } from '../stores.js';
  if ($gyms == null || Object.keys($gyms).length == 0) {
    getGyms();
  }

  export let selected;

  async function getGyms() {
    const data = await fetch('https://api.toplogger.nu/v1/gyms/');
    const json = await data.json();
    gyms.set(json);
    return json;
  }
</script>

<div class="p-4">
  <label class="mb-1 block font-bold" for="gym">Gym</label>
  <select
    class="px-2 py-0.5 border-2 rounded w-full"
    name=""
    id="gym"
    bind:value={selected}
    on:change={async () => {
      const { svg, gym, routes } = await getGymData(
        selected.id,
        selected.id_name
      );

      gymStore.set(gym);
      routeStore.set(routes);
      mapSvg.set(svg);
    }}
  >
    {#if $gyms && Object.keys($gyms).length != 0 && $gyms}
      {#each $gyms as gym}
        <option value={gym}>{gym.name}</option>
      {/each}
    {/if}
  </select>
</div>

<style>
</style>
