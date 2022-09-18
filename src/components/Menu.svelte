<script>
  import { createEventDispatcher } from 'svelte';
  import { gyms, gym } from '../stores';

  import GymSelect from './GymSelect.svelte';
  import GradeSelector from './GradeSelector.svelte';
  // import { getGymData } from '../modules/fetchGymData';

  const dispatch = createEventDispatcher();

  let menuOpen = false;

  let selectedIndex = $gyms?.findIndex((x) => x?.id === $gym?.id);
  let selected = selectedIndex > -1 ? $gyms[selectedIndex] : {};
</script>

<header
  class="fixed top-0 left-0 z-30 flex items-center px-4 py-2 bg-white shadow-lg"
>
  <label for="menuToggle" class="z-20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </label>
  <input
    type="checkbox"
    id="menuToggle"
    bind:checked={menuOpen}
    class="w-0 h-0 hidden"
  />

  <div
    class:open={menuOpen}
    class="menu fixed top-0 left-0 h-screen w-80 pt-12 bg-white shadow-lg"
  >
    <GymSelect bind:selected />

    <GradeSelector />
  </div>
</header>

<style>
  header {
    width: calc(100vw - (100vw - 100%));
  }

  .menu {
    transform: translateX(-110%);
    transition: transform 0.2s ease;
  }

  .menu.open {
    transform: translateX(0);
  }
</style>
