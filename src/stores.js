import { writable, derived, get } from 'svelte/store';

// gyms store
const storedGyms = JSON.parse(localStorage.getItem('gyms'));
export const gyms = writable(storedGyms);
gyms.subscribe((value) => {
  if (typeof value === 'object' && value != null) {
    localStorage.setItem('gyms', JSON.stringify(value));
  }
});

// selected gym
export const gym = writable(JSON.parse(localStorage.getItem('gym')));
gym.subscribe((value) => {
  if (typeof value === 'object' && value != null) {
    localStorage.setItem('gym', JSON.stringify(value));
  }
});

export const gradeSystem = writable('french_boulder');

// TODO add stores for routes, svg and groups

// store map
export const mapSvg = writable('');

// store routes
export const routes = writable([]);

// store checkmarked routes?

export const zoomLevel = writable(1);

export const selectedClimb = writable({});
export const showRouteData = writable(false);

export let colorMap = derived(gym, ($gym) => {
  let map = {};
  $gym.holds.forEach((item) => {
    map[item.brand] = item.color_secondary
      ? `linear-gradient(135deg, ${item.color} 50%, ${item.color_secondary} 50%)`
      : item.color;
  });
  return map;
});

// Store wrapper
export const throttle = (store) => {
  let lastTime;
  return derived(store, (value, set) => {
    let now = Date.now();
    if (!lastTime || now - lastTime > 10) {
      set(value);
      lastTime = now;
    }
  });
};
