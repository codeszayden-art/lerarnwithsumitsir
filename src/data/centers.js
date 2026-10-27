import imgCenterDelhi from '@/assets/images/centers/center-delhi.jpg';
import imgCenterMahendragarh from '@/assets/images/centers/center-mahendragarh.jpg';
import imgCenterPune from '@/assets/images/centers/center-pune.jpg';
import imgCenterLucknow from '@/assets/images/centers/center-lucknow.jpg';

/** Campuses shown on the map and in the slider. `pin` positions the marker on the India SVG map. */
export const CENTERS = [
  {
    id: 1,
    name: 'Dwarka Mor (Delhi)',
    address: '2nd Floor, Opp. Metro Pillar No. 783, Dwarka Metro Station, New Delhi – 110059',
    phones: ['7976813265', '8383995098'],
    image: imgCenterDelhi,
    imageAlt: 'Dwarka Mor centre, Delhi',
    pin: {
      label: 'Delhi',
      transform: 'translate(175.8 194.9)',
      labelX: 14,
      labelY: -9,
      anchor: 'start',
    },
  },
  {
    id: 2,
    name: 'Mahendra Garh (Haryana)',
    address: 'Kanina-Kapoori Road Kakrda, Chelavas, Mahendragarh, Haryana – 123027',
    phones: ['7983507721', '9528091141'],
    image: imgCenterMahendragarh,
    imageAlt: 'Mahendra Garh centre, Haryana',
    pin: {
      label: 'Haryana',
      transform: 'translate(159.8 201.7)',
      labelX: -14,
      labelY: 5,
      anchor: 'end',
    },
  },
  {
    id: 3,
    name: 'Pune (Maharashtra)',
    address: '2nd Floor, Sagar Arcade Fergusson College Road Near Good Luck Chowk, Shivajinagar Pune – 411004',
    phones: ['7983507721', '9557976848'],
    image: imgCenterPune,
    imageAlt: 'Pune centre, Maharashtra',
    pin: {
      label: 'Maharashtra',
      transform: 'translate(118.3 391.9)',
      labelX: 14,
      labelY: 5,
      anchor: 'start',
    },
  },
  {
    id: 4,
    name: 'Lucknow (UP)',
    address: 'Near Heeralal Yadav Public School. Benti, Banthara, Mohan road, Lucknow, Uttar Pradesh 226401',
    phones: ['7983507721', '9528091141'],
    image: imgCenterLucknow,
    imageAlt: 'Lucknow centre, UP',
    pin: {
      label: 'UP',
      transform: 'translate(246.8 229.4)',
      labelX: 14,
      labelY: 5,
      anchor: 'start',
    },
  },
];
