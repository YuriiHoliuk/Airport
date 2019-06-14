import { FLIGHT_TYPES } from './constants';

export function createFlightMapper(type) { // departure | arrival
  return (flightItem) => {
    const base = {
      id: flightItem.ID,
      terminal: flightItem.term,
      airline: flightItem.airline
        && flightItem.airline.en
        && flightItem.airline.en.name,
      flightNumber: flightItem.codeShareData
        && flightItem.codeShareData[0]
        && flightItem.codeShareData[0].codeShare,
      status: flightItem.status,
    };

    // eslint-disable-next-line default-case
    switch (type) {
      case FLIGHT_TYPES.DEPARTURE:
        return {
          ...base,
          gate: flightItem.gateNo,
          time: flightItem.timeDepShedule,
          destination: flightItem['airportToID.name_en'],
        };
      case FLIGHT_TYPES.ARRIVAL:
        return {
          ...base,
          time: flightItem.timeArrShedule,
          destination: flightItem['airportFromID.name_en'],
        };
    }
  };
}

export function createDateString(date) {
  const monthDay = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${monthDay}-${month}-${year}`;
}
