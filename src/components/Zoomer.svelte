<script>
  import { zoomLevel } from '../stores';

  export let disabled = false;

  let isPanning = false;

  let zoom = 1;

  let x = 0;
  let y = 0;

  // panning
  let initialPointerX = 0;
  let initialPointerY = 0;
  let panDeltaX = 0;
  let panDeltaY = 0;

  let innerHeight;
  let innerWidth;

  let innerWrap;

  export let scaleExtent = [0, Infinity];

  function isPanningStartAllowed(ev) {
    return ev.button === 0;
  }

  function onPanningStart(ev) {
    if (disabled) return;
    if (!isPanningStartAllowed(ev)) return;

    // ev.preventDefault();
    // ev.stopPropagation();

    isPanning = true;
    initialPointerX = ev.clientX;
    initialPointerY = ev.clientY;
    panDeltaX = 0;
    panDeltaY = 0;
  }

  function onPanning(ev) {
    if (!isPanning) return;
    // TODO option to clamp these values
    panDeltaX = ev.clientX - initialPointerX;
    panDeltaY = ev.clientY - initialPointerY;
  }

  function onPanningStop(ev) {
    isPanning = false;
    x += panDeltaX;
    y += panDeltaY;
    panDeltaX = 0;
    panDeltaY = 0;
  }

  // TODO throttle this event?
  function onWheel(ev) {
    let newZoom = Math.max(
      scaleExtent[0],
      Math.min(scaleExtent[1], zoom * Math.pow(2, -ev.deltaY / 500))
    );

    const rect = innerWrap.getBoundingClientRect();
    const mouseX = (ev.clientX - rect.left) / zoom;
    const mouseY = (ev.clientY - rect.top) / zoom;

    const scaleDifference = newZoom - zoom;

    zoom = newZoom;
    $zoomLevel = zoom;
    x -= mouseX * scaleDifference;
    y -= mouseY * scaleDifference;
  }

  function onTouchStart(ev) {
    onPanningStart(ev.touches[0]);
  }

  function onTouchMove(ev) {
    onPanning(ev.touches[0]);
  }

  function onTouchStop(ev) {
    onPanningStop(ev.touches[0]);
  }
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div
  class="wrapper"
  on:pointerdown={onPanningStart}
  on:pointermove={onPanning}
  on:pointerup={onPanningStop}
  on:mousewheel={onWheel}
  on:touchstart={onTouchStart}
  on:touchmove={onTouchMove}
  on:touchend={onTouchStop}
>
  <div
    bind:this={innerWrap}
    class="flex flex-wrap w-fit h-fit p-0 m-0 origin-top-left"
    style:transform="translate3d({x + panDeltaX}px, {y + panDeltaY}px, 0) scale({zoom})"
  >
    <slot />
  </div>
</div>

<style>
  .wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
    /* width: 100vw;
    height: 100vh; */
    overflow: hidden;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0;
    padding: 0;
  }
</style>
