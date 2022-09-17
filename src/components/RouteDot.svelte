<script>
  import { getContrast, getRouteColor } from '../modules/colorHelpers';
  import { gradeConverter } from '../modules/gradeConverter';

  import { gradeSystem, selectedClimb, showRouteData } from '../stores';

  export let climb;
  export let groups;

  export let scale = 1;

  export let x;
  export let y;
</script>

<foreignObject
  class="cursor-pointer overflow-visible"
  width="40"
  height="40"
  {x}
  {y}
  on:click|stopPropagation={() => {
    $selectedClimb = climb;
    $showRouteData = true;
  }}
>
  <div
    class="w-[40px] h-[40px] rounded-full relative"
    class:new={new Date().getTime() <
      new Date(climb.date_set).getTime() + 7 * 24 * 3600 * 1000}
    style:color={getContrast(getRouteColor(climb.id, groups, false))}
    style:transform="scale({scale})"
    style:background-color={getRouteColor(climb.id, groups, true)}
  >
    {gradeConverter(
      climb.grade,
      $gradeSystem ? $gradeSystem : 'french_boulder'
    )}

    <!-- render question mark if no grade is given? -->
    <!-- {new Date(climb.date_live_start).getTime() > new Date().getTime()
      ? '?'
      : gradeConverter()} -->
  </div>
</foreignObject>

<style>
  div {
    background: var(--dot-col);

    text-align: center;
    vertical-align: middle;
    line-height: 38px;

    box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);

    /* transform: scale(var(--dot-scale)); */
  }
</style>
