import React, { Component } from 'react';
import './App.css';
import { Api } from './api';
import { createDateString, createFlightMapper } from './utils';
import { BASE_URL, COLUMNS_BY_TYPE, FLIGHT_TYPES } from './constants';
import { Button } from './components/Button';
import { FlightRow } from './components/FlightRow';

const { ARRIVAL, DEPARTURE } = FLIGHT_TYPES;

export class App extends Component {
  constructor(props) {
    super(props);
    this.api = new Api(BASE_URL);

    this.state = {
      selectedDate: createDateString(new Date()),
      [DEPARTURE]: [],
      [ARRIVAL]: [],
      activeFlightType: DEPARTURE,
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;

    this.loadFlights(selectedDate);
  }

  changeActiveFlight = type => (event) => {
    event.preventDefault();

    this.setState({ activeFlightType: type });
  };

  selectDate = ({ target: { value } }) => {
    const [year, month, day] = value.split('-');
    const selectedDate = [day, month, year].join('-');

    this.loadFlights(selectedDate);

    this.setState({
      selectedDate,
      [DEPARTURE]: [],
      [ARRIVAL]: [],
    });
  };

  async loadFlights(date) {
    const data = await this.api.get(date);
    const { departure, arrival } = data.body;

    const departures = departure.map(createFlightMapper(DEPARTURE));
    const arrivals = arrival.map(createFlightMapper(ARRIVAL));

    this.setState({ [DEPARTURE]: departures, [ARRIVAL]: arrivals });
  }

  render() {
    const { activeFlightType, selectedDate } = this.state;

    const [day, month, year] = selectedDate.split('-');
    const pickerValue = [year, month, day].join('-');

    return (
      <div className="container">
        <div className="controls">
          <Button
            isActive={activeFlightType === DEPARTURE}
            onClick={this.changeActiveFlight(DEPARTURE)}
          >
            Departures
          </Button>

          <Button
            isActive={activeFlightType === ARRIVAL}
            onClick={this.changeActiveFlight(ARRIVAL)}
          >
            Arrivals
          </Button>
        </div>

        <div className="calendar">
          <input
            type="date"
            value={pickerValue}
            onChange={this.selectDate}
          />
        </div>

        <table className="flights">
          <thead>
            <tr>
              {COLUMNS_BY_TYPE[activeFlightType].map(columnName => (
                <th key={columnName}>
                  <span>{columnName}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {this.state[activeFlightType].map(flight => (
              <FlightRow key={flight.id} type={activeFlightType} {...flight} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
