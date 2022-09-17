<script>
  import { afterUpdate, onMount, tick } from 'svelte';
  import { gym, gyms } from './stores';
  import * as d3 from 'd3';

  import { getContrast, getRouteColor } from './modules/colorHelpers';
  import { gradeConverter } from './modules/gradeConverter';
  import { fetchGymData } from './modules/fetchGymData';
  import { gradeSystem, showRouteData } from './stores';

  import RoutePreview from './components/RoutePreview.svelte';
  import Menu from './components/Menu.svelte';
  import Map from './components/Map.svelte';
  import Zoomer from './components/Zoomer.svelte';

  let d3climbs;

  $: climbs = [];
  let gymSvg = ''; // rename to mapSvg / floorplanSvg / svgMap
  let groups;

  let map;
  let mapWidth;
  let mapHeight;

  // let dotScale = 1;

  let routesElement;

  let selectedGym = $gym?.id ? $gym : {};

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  $: windowWidth, mapSetup();
  $: windowHeight, mapSetup();

  // $: gymSvg, d3ify(climbs, groups);
  $: gymSvg, getMapWidth();

  // $: {
  //   console.log(mapWidth, windowWidth, windowWidth / mapWidth);
  // }

  $: {
    const re = /<a[^>]*?href=(["\'])?((?:.(?!\1|>))*.?)\1?/gi;
    // console.log(gymSvg);
    // console.log(
    //   gymSvg.match(/<svg[^>]*?width=(["\'])?((?:.(?!\1|>))*.?)\1?/gi)
    // );

    // if (map && gymSvg) {
    //   const mapWrap = document.querySelector('#map svg');
    //   console.log(mapWrap);
    //   console.log(
    //     mapWrap.getBoundingClientRect(),
    //     mapWrap.offsetWidth,
    //     mapWrap.clientHeight
    //   );
    // }
  }

  $: {
    if (gymSvg) {
      const mapWrap = document.querySelector('#map svg');

      if (mapWrap) {
        // console.log(mapWrap.getBoundingClientRect());
      }
    }
  }

  async function getMapWidth() {
    await tick();
    const mapWrap = document.querySelector('#map');
    const { width, height } = mapWrap.getBoundingClientRect();

    // console.log(mapWrap, width, height);

    mapWidth = width;
    mapHeight = height;
  }

  afterUpdate(() => {
    // console.log();

    if (map && gymSvg) {
      const mapWrap = document.querySelector('#map');
      // console.log(mapWrap);
      // console.log(
      //   mapWrap.getBoundingClientRect(),
      //   mapWrap.offsetWidth,
      //   mapWrap.clientHeight
      // );

      const { width, height } = mapWrap.getBoundingClientRect();

      // mapWidth = width;
      // mapHeight = height;
    }

    // climbs = climbs;
  });

  // function svgFunc(node, svg) {
  //   return {
  //     update() {
  //       d3ify(climbs, groups);

  //       // this adds double routes > clear svg first?
  //     },
  //     destroy() {
  //       // console.log('destroyed', node);
  //     },
  //   };
  // }

  gradeSystem.subscribe((value) => {
    // rerender values
    if (d3climbs) {
      d3climbs
        .selectAll('div')
        .html((d) => {
          // TODO update to be based on route type and gym grading
          return gradeConverter(d.grade, value ? value : 'french_boulder');
        })
        .attr('style', (d) => getRouteColor(d.id, groups, true))
        .style('color', (d) => getContrast(getRouteColor(d.id, groups, false)));
    }
  });

  // TODO add popup to re center map if you are far out > disable panning clamp

  function mapSetup() {
    // console.log('map setup');
    // set width and height
    // set zoom
    // const svg = d3
    //   .select('svg.flex')
    //   .attr('width', windowWidth)
    //   .attr('height', windowHeight);
    // if (climbs && groups) {
    //   d3ify(climbs, groups);
    // }
  }

  function d3ify(climbData, groups) {
    // convert routes data to a more light weight and minimal format?

    // update these on resize.
    const svg = d3
      .select('svg.flex')
      .attr('width', windowWidth)
      .attr('height', windowHeight);

    // each has to not be an arrow function or "this" will be undefined
    d3.selectAll('g#zoom_layer').each(function () {
      let el = this;
      d3.select(el.parentNode)
        .insert('g')
        .attr('class', 'zoom')
        .append(() => el);
    });

    // normalize floorplan translation and scale
    const bbox = svg.select('#zoom_layer').node().getBBox();

    routesElement = svg
      .select('#zoom_layer')
      .attr('transform', `translate(${-bbox.x}, ${-bbox.y})`)
      .append('g')
      .attr('class', 'routes');

    d3climbs = routesElement
      .selectAll('foreignObject')
      .data(climbData)
      .enter()
      .append('foreignObject')
      .on('click', (e, d) => {
        e.stopPropagation();
        selectedClimb = d;
        showRouteData.set(true);

        console.log('bbox', bbox.width, windowWidth);

        const scale = (bbox.width / windowWidth) * 0.75;

        const x = bbox.width * d.position_x - bbox.x;
        const y = bbox.height * d.position_y - bbox.y;

        const xOff = windowWidth / 2 - 20; // 20 should be half dot size, but seens arbitrary
        const yOff = windowHeight / 2 - 20;

        svg
          .transition()
          .duration(500)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(-x * scale + xOff, -y * scale + yOff)
              .scale(scale)
          );
      })
      .attr('x', (d) => bbox.width * d.position_x)
      .attr('y', (d) => bbox.height * d.position_y)
      .attr('width', 40)
      .attr('height', 40);

    d3climbs
      .append('xhtml:div')
      .html((d) => {
        // TODO update to be based on route type and gym grading
        return gradeConverter(
          d.grade,
          $gradeSystem ? $gradeSystem : 'french_boulder'
        );
      })
      .attr('style', (d) => getRouteColor(d.id, groups, true))
      .style('color', (d) => getContrast(getRouteColor(d.id, groups, false)));

    const zoomEl = svg.select('.zoom');

    // not sure if translateExtents gives the right effect of
    // clamping map to withing viewport
    const zoomPadding = 150;

    const zoom = d3
      .zoom()
      .translateExtent([
        [-zoomPadding, -zoomPadding],
        [bbox.width + zoomPadding, bbox.height + zoomPadding],
      ]) // change these values to be more dynamic and based on scale
      .scaleExtent([0.1, 2.5])
      .on('zoom', (e, d) => {
        zoomEl.attr('transform', e.transform);

        // console.log(e.transform.k); // this is basically the zoom level

        dotScale = Math.round((1 / e.transform.k) * 100) / 100;
        // dotScale = 1 / e.transform.k;
        // routes.attr('style', `--dot-scale: ${1 / e.transform.k}`);
      });

    //setup zoom and initial zoom
    const baseScale = (windowHeight / bbox.height) * 0.9;
    const baseX = windowWidth / 2 - (bbox.width / 2) * baseScale;
    const baseY = windowHeight / 2 - (bbox.height / 2) * baseScale;
    svg
      .call(zoom)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(baseX, baseY).scale(baseScale)
      );

    svg
      .select('.zoom')
      .attr('transform', `translate(${baseX}, ${baseY}) scale(${baseScale})`);

    // zoom into map region on click
    d3.selectAll('g.map-region').on('click', function (e) {
      e.stopPropagation();
      // zoom into map region
      const nodeBox = svg.select(`#${this.id}`).node().getBBox();

      const scale = (windowHeight / nodeBox.height) * 0.8;

      const x = -(nodeBox.x - bbox.x) * scale;
      const y = -(nodeBox.y - bbox.y) * scale;

      const yOff = windowHeight / 2 - (nodeBox.height / 2) * scale;
      const xOff = windowWidth / 2 - (nodeBox.width / 2) * scale;

      svg
        .transition()
        .duration(500)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(x + xOff, y + yOff).scale(scale)
        );
    });
  }

  onMount(async () => {
    // fetch all data
    const selectedGym = $gym?.id_name ? $gym.id_name : 'bruut_boulder_breda';
    const selectedId = $gym?.id ? $gym.id : 8;
    [climbs, groups, gymSvg] = await fetchGymData(selectedId, selectedGym);

    // TODO every time gym is switched
    // unwrap gym svg element
    const parser = new DOMParser();
    const doc = parser.parseFromString(gymSvg, 'text/html');
    gymSvg = doc.querySelector('#zoom_layer').innerHTML;
  });
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<Menu
  bind:selected={selectedGym}
  on:changeGym={async (e) => {
    // fetch grading system
    const gymData = await fetch(
      `https://api.toplogger.nu/v1/gyms/${e.detail.slug}`
    );
    const gymJson = await gymData.json();

    $gradeSystem =
      gymJson.grading_system_boulders || gymJson.grading_system_routes;

    // refetch routes
    [climbs, groups, gymSvg] = await fetchGymData($gym.id, $gym.id_name);
  }}
/>

<main>
  <!-- <div class="svgContainer h-screen hidden" use:svgFunc={gymSvg}> -->
  <div class="svgContainer h-screen hidden">
    {@html gymSvg}
  </div>

  <Zoomer>
    <div class="w-screen h-screen">
      <div class="w-screen h-screen flex justify-center align-middle">
        <Map {climbs} {groups} mapSvg={gymSvg} />
        <!-- <div class="testMap w-[1000px] h-[1000px]" /> -->
      </div>
    </div>
  </Zoomer>

  <div>
    <!-- <svg bind:this={map} width={mapWidth} height={mapHeight}>
      <g class="map-zoom">
        <g class="map-scale">
          <g
            class="map"
            id="map"
            temp="{mapWidth} {windowWidth}"
            width={mapWidth}
            height={mapHeight}
            style:transform="scale({(mapWidth / windowWidth) * 0.75})"
          > -->
    <!-- map areas -->
    <!-- {@html gymSvg}
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
      </g> -->
    <!-- </svg> -->
  </div>

  {#if $showRouteData}
    <RoutePreview />
  {/if}
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
  }

  :global(body) {
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
  }

  .testMap {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
      linear-gradient(-45deg, #808080 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #808080 75%),
      linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 50px 50px;
    background-position: 0 0, 0 25px, 25px -25px, -25px 0px;
  }

  /* .svgContainer {
    width: calc(100vw - (100vw - 100%));
  } */

  /* :global(.white) {
    fill: var(--white);
  }

  :global(.black) {
    fill: var(--black);
  } */
</style>
