import { get } from 'svelte/store';
import { gym } from '../stores';

const grades = {
  uiaa: {
    2: 'III',
    3: 'IV-',
    3.44: 'IV',
    3.89: 'IV+',
    4.33: 'V-',
    4.67: 'V',
    4.92: 'V+',
    5.5: 'VI',
    5.21: 'VI-',
    5.78: 'VI+',
    6.06: 'VII-',
    6.33: 'VII',
    6.56: 'VII+',
    6.78: 'VIII-',
    7: 'VIII',
    7.22: 'VIII+',
    7.44: 'IX-',
    7.67: 'IX',
    7.89: 'IX+',
    8.11: 'X-',
    8.33: 'X',
    8.56: 'X+',
    8.78: 'XI-',
    9: 'XI',
    9.22: 'XI+',
    9.44: 'XII-',
  },
  yds: {
    2.0: '5.3',
    3.0: '5.4',
    4.0: '5.5',
    4.33: '5.6',
    4.67: '5.7',
    5.0: '5.8',
    5.33: '5.9',
    5.67: '5.10a',
    6.0: '5.10b',
    6.5: '5.11a',
    6.17: '5.10c',
    6.33: '5.10d',
    6.67: '5.11b',
    6.83: '5.11c',
    7.0: '5.11d',
    7.5: '5.12c',
    7.17: '5.12a',
    7.33: '5.12b',
    7.67: '5.12d',
    7.83: '5.13a',
    8.0: '5.13b',
    8.5: '5.14a',
    8.17: '5.13c',
    8.33: '5.13d',
    8.67: '5.14b',
    8.83: '5.14c',
    9.0: '5.14d',
    9.5: '5.15c',
    9.17: '5.15a',
    9.33: '5.15b',
  },
  french: {
    2.0: '2',
    2.5: '2',
    3.0: '3a',
    3.33: '3b',
    3.67: '3c',
    4.0: '4a',
    4.33: '4b',
    4.67: '4c',
    5.0: '5a',
    5.17: '5a+',
    5.33: '5b',
    5.5: '5b+',
    5.67: '5c',
    5.83: '5c+',
    6.0: '6a',
    6.17: '6a+',
    6.33: '6b',
    6.5: '6b+',
    6.67: '6c',
    6.83: '6c+',
    7.0: '7a',
    7.17: '7a+',
    7.33: '7b',
    7.5: '7b+',
    7.67: '7c',
    7.83: '7c+',
    8.0: '8a',
    8.17: '8a+',
    8.33: '8b',
    8.5: '8b+',
    8.67: '8c',
    8.83: '8c+',
    9.0: '9a',
    9.17: '9a+',
    9.33: '9b',
    9.5: '9b+',
  },
  french_boulder: {
    2.0: '2',
    2.5: '2',
    2.75: '2+',
    3.0: '3a',
    3.33: '3b',
    3.67: '3c',
    4.0: '4a',
    4.33: '4b',
    4.67: '4c',
    5.0: '5a',
    5.17: '5a+',
    5.33: '5b',
    5.5: '5b+',
    5.67: '5c',
    5.83: '5c+',
    6.0: '6a',
    6.17: '6a+',
    6.33: '6b',
    6.5: '6b+',
    6.67: '6c',
    6.83: '6c+',
    7.0: '7a',
    7.17: '7a+',
    7.33: '7b',
    7.5: '7b+',
    7.67: '7c',
    7.83: '7c+',
    8.0: '8a',
    8.17: '8a+',
    8.33: '8b',
    8.5: '8b+',
    8.67: '8c',
    8.83: '8c+',
    9.0: '9a',
    9.17: '9a+',
    9.33: '9b',
    9.5: '9b+',
  },
  french_rounded: {
    2.0: '2',
    2.5: '2',
    2.75: '2+',
    3.0: '3',
    3.33: '3+',
    3.67: '4-',
    4.0: '4',
    4.33: '4+',
    4.67: '5-',
    5.0: '5',
    5.5: '5+',
    6.0: '6a',
    6.5: '6b+',
    6.17: '6a+',
    6.33: '6b',
    6.67: '6c',
    6.83: '6c+',
    7.0: '7a',
    7.5: '7b+',
    7.17: '7a+',
    7.33: '7b',
    7.67: '7c',
    7.83: '7c+',
    8.0: '8a',
    8.5: '8b+',
    8.17: '8a+',
    8.33: '8b',
    8.67: '8c',
    8.83: '8c+',
    9.0: '9a',
    9.5: '9b+',
    9.17: '9a+',
    9.33: '9b',
  },
  ewbank: {
    2.0: '7',
    3.0: '8',
    3.33: '9',
    3.67: '10',
    4.0: '11',
    4.33: '12',
    4.66: '13',
    5.0: '14',
    5.33: '15',
    5.67: '16',
    6.0: '17',
    6.5: '20',
    6.17: '18',
    6.33: '19',
    6.67: '21',
    6.83: '22',
    7.0: '23',
    7.5: '26',
    7.17: '24',
    7.33: '25',
    7.67: '27',
    7.83: '28',
    8.0: '29',
    8.5: '32',
    8.17: '30',
    8.33: '31',
    8.67: '33',
    8.83: '34',
    9.0: '35',
    9.5: '38',
    9.17: '36',
    9.33: '37',
  },
  british: {
    2.0: 'B0',
    3.0: 'B1',
    3.83: 'B2',
    5.0: 'B3',
    6.0: 'B4',
    6.28: 'B5',
    6.56: 'B6',
    6.83: 'B7',
    7.11: 'B8',
    7.39: 'B9',
    7.67: 'B10',
    7.87: 'B11',
    8.08: 'B12',
    8.29: 'B13',
    8.5: 'B14',
    8.67: 'B15',
    8.83: 'B16',
    9.0: 'B17',
  },
  v_grade: {
    2.0: 'VB',
    3.0: 'VB',
    3.5: 'V0-',
    4.0: 'V0',
    4.5: 'V0+',
    5: 'V1',
    5.5: 'V2',
    6.0: 'V3',
    6.33: 'V4',
    6.67: 'V5',
    7.0: 'V6',
    7.2: 'V7',
    7.4: 'V8',
    7.6: 'V9',
    7.8: 'V10',
    8.0: 'V11',
    8.17: 'V12',
    8.33: 'V13',
    8.5: 'V14',
    8.67: 'V15',
    8.83: 'V16',
    9.0: 'V17',
  },
};

/**
 * convert grade value to different grading system
 * @param { number } value grading value to convert
 * @param { string } to grading system to convert to
 */
export function gradeConverter(value, to) {
  // convert custom to custom
  if (to === 'custom_boulder') {
    // TODO test for routes
    // TODO What to do with name1 and name2 and so on
    // TODO this could be optimized, since you use the same grading system for every boulder
    const gradingLookup = JSON.parse(
      get(gym).grading_system_custom_boulders_json
    );

    const item = gradingLookup.data.find(
      (item) => item.value === Number(value)
    );

    return item.name;
  }

  // get closest grade if none is found
  if (!grades[to][Number(value)]) {
    // convert keys to numbers
    const counts = Object.keys(grades[to]).map((i) => Number(i));
    const goal = Number(value);

    // convert grade rounded to nearest
    // const closest = counts.reduce((prev, curr) => {
    //   return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    // });

    // convert grade rounded down
    const lower = Math.max(...counts.filter((num) => num <= goal));
    return grades[to][lower];
  }

  return grades[to][Number(value)];
}
