import React from 'react';
import { FLIGHT_TYPES } from '../constants';

export const FlightRow = props => {
  const {
    type,
    terminal,
    gate,
    airline,
    flightNumber,
    status,
    time,
    destination,
  } = props;

  return (
    <tr>
      <td>
        <span>{terminal}</span>
      </td>

      {type === FLIGHT_TYPES.DEPARTURE && (
        <td>
          <span>{gate}</span>
        </td>
      )}

      <td>
        <span>{time}</span>
      </td>

      <td>
        <span>{destination}</span>
      </td>

      <td>
        <span>{airline}</span>
      </td>

      <td>
        <span>{flightNumber}</span>
      </td>

      <td>
        <span>{status}</span>
      </td>
    </tr>
  );
};
