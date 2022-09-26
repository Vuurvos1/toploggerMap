const baseUrl = 'https://api.toplogger.nu/v1';

function svgUrl(gymName) {
  return `https://cdn1.toplogger.nu/images/gyms/${gymName}/floorplan.svg`;
}

function climbsUrl(gymId) {
  const filters = {
    filters: {
      deleted: false,
      live: true,
    },
  };

  return `${baseUrl}/gyms/${gymId}/climbs?json_params=${encodeURIComponent(
    JSON.stringify(filters)
  )}`;
}

function groupsUrl(gymId) {
  const filters = {
    filters: {
      gym_id: gymId,
      deleted: false,
      live: true,
      score_system: 'none',
    },
  };

  return `${baseUrl}/groups?json_params=${encodeURIComponent(
    JSON.stringify(filters)
  )}`;
}

/**
 * to be depricated
 */
export async function fetchGymData(gymId, idName) {
  const [climbs, groups, gymSvg] = await Promise.all([
    fetch(climbsUrl(gymId)),
    fetch(groupsUrl(gymId)),
    fetch(svgUrl(idName)),
  ])
    .then((res) => {
      return Promise.all([res[0].json(), res[1].json(), res[2].text()]);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return [climbs, groups, gymSvg];
}

export async function getGymData(gym_id, id_name) {
  const gymParams = encodeURIComponent(
    JSON.stringify({
      includes: ['holds', 'walls'],
    })
  );

  const climbParams = encodeURIComponent(
    JSON.stringify({
      filters: {
        deleted: false,
        live: true,
      },
    })
  );

  // fetch floorplan svg, gym data, and routes
  const responses = await Promise.all([
    fetch(`https://cdn1.toplogger.nu/images/gyms/${id_name}/floorplan.svg`),
    fetch(
      `https://api.toplogger.nu/v1/gyms/${gym_id}?json_params=${gymParams}`
    ),
    fetch(
      `https://api.toplogger.nu/v1/gyms/${gym_id}/climbs?json_params=${climbParams}`
    ),
  ]); // TODO error handle these

  const [svg, gym, routes] = await Promise.all([
    responses[0].text(),
    responses[1].json(),
    responses[2].json(),
  ]);

  // unwrap gym svg element so it displays correctly
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'text/html');
  const parsedSvg = doc.querySelector('#zoom_layer').innerHTML;

  return { svg: parsedSvg, gym, routes };
}
