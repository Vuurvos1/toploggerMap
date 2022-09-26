<script>
  import { onMount } from 'svelte';
  import { zoomLevel } from '../stores';

  $: zoom, ($zoomLevel = zoom);

  export let disabled = false;

  // TODO pinching still feels a tiny bit jank so could be improved (centering is weird)

  let isPanning = false;
  let zoom = 1;

  // $: zoomToPixel($selectedPixel);
  /** @param {{x: number, y: number}} pixel  */
  function zoomToPixel(pixel) {
    if (!pixel) return;
    zoom = 1;

    // x = -(pixel.x * 1 - wrapperWidth / 2)
    // y = -(pixel.y * 1 - wrapperHeight / 2)
  }

  let x = 0;
  let y = 0;

  // Panning
  let activePointerid; // number / undefined
  let initialPointerX = 0;
  let initialPointerY = 0;
  let panDeltaX = 0;
  let panDeltaY = 0;

  let innerHeight;
  let innerWidth;
  let wrapperWidth;
  let wrapperHeight;

  /** @type HTMLElement */
  let inner;

  export let scaleExtent = [0, Infinity];

  /** @param {PointerEvent} ev  */
  function onPanningStart(ev) {
    if (disabled) return;

    // Which buttons are these?
    if (ev.button > 0) {
      onPanningStop(ev);
      return;
    }

    if (activePointerid !== undefined) return;

    // ev.preventDefault();
    // ev.stopPropagation();

    isPanning = true;
    initialPointerX = ev.clientX;
    initialPointerY = ev.clientY;
    panDeltaX = 0;
    panDeltaY = 0;
    activePointerid = ev.pointerId;
  }

  /** @param {PointerEvent} ev  */
  function onPanning(ev) {
    if (!isPanning) {
      if (ev.pointerType === 'touch') onPanningStart(ev);
      return;
    }

    if (ev.pointerId !== activePointerid) return;

    // TODO option to clamp these values
    panDeltaX = ev.clientX - initialPointerX;
    panDeltaY = ev.clientY - initialPointerY;

    if (Math.pow(panDeltaX, 2) + Math.pow(panDeltaY, 2) > 50 * 50) {
      // $selectedPixel = null;
    }

    const [clampedX, clampedY] = clampPanning(x + panDeltaX, y + panDeltaY);
    panDeltaX = clampedX - x;
    panDeltaY = clampedY - y;
  }

  function clampPanning(x, y) {
    let clampedX = x;
    let clampedY = y;

    if (x > wrapperWidth / 2) {
      clampedX = wrapperWidth / 2;
    } else if (x + innerWidth * zoom < wrapperWidth / 2) {
      clampedX = wrapperWidth / 2 - innerWidth * zoom;
    }

    if (y > wrapperHeight / 2) {
      clampedY = wrapperHeight / 2;
    } else if (y + innerHeight * zoom < wrapperHeight / 2) {
      clampedY = wrapperHeight / 2 - innerHeight * zoom;
    }

    // return [clampedX, clampedY];
    return [x, y]; // TODO fix math
  }

  /** @param {PointerEvent} ev  */
  function onPanningStop(ev) {
    if (ev.pointerId !== activePointerid) return;

    activePointerid = undefined;
    isPanning = false;
    x += panDeltaX;
    y += panDeltaY;

    // const [clampedX, clampedY] = clampPanning(x, y);
    // x = clampedX;
    // y = clampedY;
    panDeltaX = 0;
    panDeltaY = 0;
  }

  function clamp(num, min, max) {
    // TODO is this faster than a ternary operator / an if else
    return Math.max(min, Math.min(num, max));
  }

  // TODO throttle this event?
  function onWheel(ev) {
    // TODO use clamp function here for readability
    let newZoom = clamp(
      zoom * Math.pow(2, -ev.deltaY / 500),
      scaleExtent[0],
      scaleExtent[1]
    );

    const rect = inner.getBoundingClientRect();
    const mouseX = (ev.clientX - rect.left) / zoom;
    const mouseY = (ev.clientY - rect.top) / zoom;

    const scaleDifference = newZoom - zoom;

    zoom = newZoom;
    x -= mouseX * scaleDifference;
    y -= mouseY * scaleDifference;
    // const [clampedX, clampedY] = clampPanning(x, y);
    // x = clampedX;
    // y = clampedY;
  }

  // TODO throttle event?
  function handleResize(width, height) {
    innerHeight = width;
    innerHeight = height;
    const xZoom = (wrapperWidth / width) * 0.9;
    const yZoom = (wrapperHeight / height) * 0.9;
    zoom = Math.min(xZoom, yZoom);
    x = (wrapperWidth - width * zoom) / 2;
    y = (wrapperHeight - height * zoom) / 2;
  }
  // $: handleResize($width, $height)

  // Pinch zoom
  let lastPinchDisctance; // number
  /** @param {TouchEvent} ev */
  function onTouchStart(ev) {
    if (ev.touches.length === 2) {
      // What even is a hypot? and is it fast?
      lastPinchDisctance = Math.hypot(
        ev.touches[0]?.pageX - ev.touches[1]?.pageX, // do a non-null assertion?
        ev.touches[0]?.pageY - ev.touches[1]?.pageY
      );
    }
    onPanningStart(ev.touches[0]);
  }

  /** @param {TouchEvent} ev  */
  function onTouchMove(ev) {
    console.log('touch move');
    if (ev.touches.length !== 2) return;

    const rect = inner.getBoundingClientRect();

    const pinchDistance = Math.hypot(
      ev.touches[0].pageX - ev.touches[1].pageX, // do a non-null assertion?
      ev.touches[0].pageY - ev.touches[1].pageY
    ); // make this a function?

    const pinchDelta = (pinchDistance / lastPinchDisctance - 1) * 2 + 1; // Stuff to prevent zoom to get stuck at 0
    const newZoom = zoom * pinchDelta;
    const scaleDifference = newZoom - zoom;
    zoom = newZoom;

    const pinchX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
    const pinchY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
    // const mouseX = clamp(pinchX - rect.left, 0, rect.width) / zoom;
    // const mouseY = clamp(pinchY - rect.top, 0, rect.height) / zoom;
    const mouseX = (pinchX - rect.left) / zoom;
    const mouseY = (pinchY - rect.top) / zoom;

    x -= mouseX * scaleDifference;
    y -= mouseY * scaleDifference;

    // const [clampedX, clampedY] = clampPanning(x, y);
    // x = clampedX;
    // y = clampedY;

    lastPinchDisctance = pinchDistance;

    // onPanning(ev.touches[0]);
  }

  /** @param {TouchEvent} ev  */
  function onTouchStop(ev) {
    onPanningStop(ev.touches[0]);
  }

  onMount(() => {
    // add listeners
    // window.addEventListener('touchstart', onTouchStart);
    return () => {
      // remove listeners
      // window.removeEventListener('touchstart', onTouchStart);
    };
  });
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<!-- on:touchend={onTouchStop} -->
<!-- preferably don't have the prevent defaults -->
<div
  class="wrapper"
  on:pointerdown={onPanningStart}
  on:pointermove={onPanning}
  on:pointerup={onPanningStop}
  on:mousewheel={onWheel}
  on:touchstart={onTouchStart}
  on:touchmove|preventDefault={onTouchMove}
  bind:clientWidth={wrapperWidth}
  bind:clientHeight={wrapperHeight}
>
  <div
    bind:this={inner}
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
