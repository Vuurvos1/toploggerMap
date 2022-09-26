/**
 * Get the contrasting color for any hex color
 * @param  {String} hexcolor A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export function getContrast(hexcolor) {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // Convert to RGB value
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? 'black' : 'white';
}

export function getRouteColor(climb_id, groups, styleVar = false) {
  return '#000000';
}
