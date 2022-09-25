<script>
  import { onMount, tick } from 'svelte';

  import RouteDot from './RouteDot.svelte';

  import { zoomLevel, routes } from '../stores';

  export let climbs = [];
  export let groups = [];
  export let mapSvg;

  let showRoutes = true;

  let map;
  let svgMap;

  let mapWidth = 0;
  let mapHeight = 0;

  $: scale = (1 / $zoomLevel) * 1;

  $: windowWidth = 0;
  $: windowHeight = 0;

  $: mapSvg, func();

  async function func() {
    if (svgMap) {
      await tick();
      // console.log(svgMap, svgMap.getBBox(), svgMap.getBoundingClientRect());
      // const { width, height } = svgMap.getBoundingClientRect();
      const bbox = svgMap.getBBox();
      // console.log(svgMap.getBBox());

      //setup zoom and initial zoom
      const baseScale = (windowHeight / bbox.height) * 0.9;
      const baseX = windowWidth / 2 - (bbox.width / 2) * baseScale;
      const baseY = windowHeight / 2 - (bbox.height / 2) * baseScale;

      scale = baseScale;
      // scale = 1;
      // x = baseX;
      // y = baseY;

      // console.log(mapWrap, width, height);

      mapWidth = bbox.width;
      mapHeight = bbox.height;

      let x = -bbox.x * scale;
      let y = -bbox.y * scale;
      // x = windowWidth / 2 - (bbox.width / 2) * baseScale;
      // y = windowHeight / 2 - (bbox.height / 2) * baseScale;
      // y = -bbox.y;
    }
  }

  $: mapSvg,
    async () => {
      await tick();
      const mapWrap = document.querySelector('#map');
      // console.log(mapWrap.getBBox());
      const { width, height } = mapWrap.getBoundingClientRect();

      // console.log(width, windowWidth);

      mapWidth = width;
      mapHeight = height;
    };

  onMount(async () => {
    if (svgMap) {
      const { width, height } = svgMap.getBBox();
      mapWidth = width;
      mapHeight = height;
    }
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<div>
  <!-- <svg width={mapWidth} height={mapHeight}> -->
  <svg width={windowWidth} height={windowHeight} class="overflow-visible">
    <g class="map" id="map" bind:this={svgMap}>
      <!-- style:transform="scale({scale})" -->
      <!-- style:transform="scale({(windowWidth / mapWidth) * 0.75})" -->
      {@html mapSvg}
    </g>
    <g class="routes">
      {#if showRoutes}
        {#each $routes as climb}
          <RouteDot
            x={mapWidth * climb.position_x}
            y={mapHeight * climb.position_y}
            {scale}
            {climb}
          />
        {/each}
      {/if}
    </g>
    <g class="areaLabels">
      <!-- map area labels -->
    </g>
  </svg>
</div>

<!-- 
<svg bind:this={map} width={mapWidth} height={mapHeight}>
  <g class="map-zoom">
    <g class="map-scale">
      <g
        class="map"
        id="map"
        temp="{mapWidth} {windowWidth}"
        width={mapWidth}
        height={mapHeight}
        style:transform="scale({(mapWidth / windowWidth) * 0.75})"
      >

        {@html gymSvg}
      </g>
      <g class="routes" id="">
        {#each climbs as climb}
          <foreignObject
            width="40"
            height="40"
            x={mapWidth * climb.position_x}
            y={mapHeight * climb.position_y}
            on:click|stopPropagation={() => {
              selectedClimb = climb;
              showRouteData = true;
            }}
          >
            <div
              style={getRouteColor(climb.id, groups, true)}
              style:color={getContrast(
                getRouteColor(climb.id, groups, false)
              )}
              style:transform="scale({1})"
              style:background-color={getRouteColor(climb.id, groups, true)}
            >
              {gradeConverter(
                climb.grade,
                $gradeSystem ? $gradeSystem : 'french_boulder'
              )}
            </div>
          </foreignObject>
        {/each}
      </g>
    </g>
  </g>
</svg> -->
<style>
</style>
