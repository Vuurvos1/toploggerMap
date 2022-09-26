<script>
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { dateConvert } from '../modules/helpers';
  import { gradeConverter } from '../modules/gradeConverter';
  import { selectedClimb, showRouteData } from '../stores';
</script>

<div
  class="preview fixed bottom-0 left-0 w-screen px-4 py-4 bg-white shadow-lg md:w-max md:right-4 md:left-auto md:bottom-4"
  transition:slide={{ duration: 200, easing: quintOut }}
>
  <div class="flex flex-row items-center mb-4">
    <h3 class="mr-auto">Route data</h3>

    <button
      on:click={async () => {
        $showRouteData = false;
      }}
      class="bg-none border-none leading-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg
      >
    </button>
  </div>

  <!-- wall area -->
  {#if $selectedClimb.remarks}
    <p>Remarks: {$selectedClimb.remarks}</p>
  {/if}

  <ul>
    <li>
      grade: {gradeConverter($selectedClimb.grade, 'french_boulder')}
    </li>
    <li>ascends: {$selectedClimb.nr_of_ascends}</li>
    <li>
      average opinion: {$selectedClimb.average_opinion}/5.0
    </li>
    <li>date set: {dateConvert($selectedClimb.date_set)}</li>
  </ul>

  <!-- <pre>{JSON.stringify($selectedClimb, null, 2)}</pre> -->
</div>

<style>
</style>
