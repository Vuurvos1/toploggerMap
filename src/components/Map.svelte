<script>
  import { onMount, tick } from 'svelte';

  import { getContrast, getRouteColor } from '../modules/colorHelpers';
  import { gradeConverter } from '../modules/gradeConverter';

  import { gradeSystem } from '../stores';

  export let climbs = [];
  export let groups = [];
  export let mapSvg;

  let showRoutes = false;

  let map;
  let svgMap;
  let selectedClimb;
  let showRouteData;

  let mapWidth = 0;
  let mapHeight = 0;

  let x = 0;
  let y = 0;
  let scale = 1;

  $: windowWidth = 0;
  $: windowHeight = 0;

  // $: mapSvg, console.log('aaaa');

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

      x = -bbox.x * scale;
      y = -bbox.y * scale;
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

    // console.log(mapWrap, width, height);
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<div>
  <!-- <svg width={mapWidth} height={mapHeight}> -->
  <svg width={windowWidth} height={windowHeight}>
    <g
      class="map-translate"
      style:transform="translate({x}px, {y}px) scale({scale})"
    >
      <g class="map-scale">
        <g class="map" id="map" bind:this={svgMap}>
          <!-- width={mapWidth}
          height={mapHeight} -->
          <!-- style:transform="scale({scale})" -->
          <!-- style:transform="scale({(windowWidth / mapWidth) * 0.75})" -->
          {@html mapSvg}
        </g>
        <g class="routes">
          {#if showRoutes}
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
          {/if}
        </g>
      </g>
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
<style lang="scss">
  svg > * {
    overflow: visible;
  }
</style>
