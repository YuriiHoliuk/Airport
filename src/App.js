import React, { Component } from 'react';
import './App.css';
import { Api } from './api';

const BASE_URL = 'https://api.iev.aero/api/flights';


/*
* Terminal - term
* Gate - gateNo
* Time - timeDepSchedule
* Destination - airportToID.name_en
* Airline  - airline.en.name
* Flight # - codeShareData.codeShare
* Status - status
*
* timeArrSchedule — для arrivals.
* arrivals Destination - airportFromID.name_en
* id - id
* */

export class App extends Component {
  constructor(props) {
    super(props);
    this.api = new Api(BASE_URL);

    const today = new Date();
    const monthDay = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    this.state = {
      selectedDate: `${monthDay}-${month}-${year}`,
      departures: [],
      arrivals: [],
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;

    this.loadFlights(selectedDate);
  }

  async loadFlights(date) {
    const data = await this.api.get(date);
    const { departure, arrival } = data.body;
    const departures = departure.map((departureItem) => {
      return {
        terminal: departureItem.term,
        gate: departureItem.gateNo,
        destination: departureItem['airportToID.name_en'],
        airline: departureItem.airline
          && departureItem.airline.en
          && departureItem.airline.en.name,
        flightNumber: departureItem.codeShareData
          && departureItem.codeShareData[0]
          && departureItem.codeShareData[0].codeShare,
        status: departureItem.status,
        time: departureItem.timeDepShedule,
      };
    });
    const arrivals = arrival.map((arrivalItem) => {
      return {
        terminal: arrivalItem.term,
        gate: arrivalItem.gateNo,
        destination: arrivalItem['airportToID.name_en'],
        airline: arrivalItem.airline
          && arrivalItem.airline.en
          && arrivalItem.airline.en.name,
        flightNumber: arrivalItem.codeShareData
          && arrivalItem.codeShareData[0]
          && arrivalItem.codeShareData[0].codeShare,
        status: arrivalItem.status,
        time: arrivalItem.timeArrSchedule,
      };
    });

    this.setState({ departures, arrivals });
  }

  render() {
    const { departures, arrivals } = this.state;

    return (
      <div>
        <pre>{JSON.stringify(arrivals, null, 4)}</pre>
      </div>
    );
  }
}
