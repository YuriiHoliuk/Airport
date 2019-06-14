export const BASE_URL = 'https://api.iev.aero/api/flights';

export const FLIGHT_TYPES = {
  ARRIVAL: 'arrival',
  DEPARTURE: 'departure',
};

const arrivalColumns = [
  'terminal',
  'time',
  'destination',
  'airline',
  'flight',
  'status',
];
const departureColumns = [
  'terminal',
  'gate',
  'time',
  'destination',
  'airline',
  'flight',
  'status',
];

export const COLUMNS_BY_TYPE = {
  [FLIGHT_TYPES.ARRIVAL]: arrivalColumns,
  [FLIGHT_TYPES.DEPARTURE]: departureColumns,
};
