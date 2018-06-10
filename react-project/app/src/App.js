import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/index';

import SearchComponent from './components/SearchComponent/SearchComponent';
import MissionItemComponent from './components/MissionItemComponent/MissionItemComponent';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      launchPads: [],
      launches: [],
      launchYears: [],
      keywords: '',
      launchPad: 'any',
      minYear: 'any',
      maxYear: 'any',
      filteredResults: [],
      errorMessage: '',
      activeRequests: 2
    }
  }

  componentDidMount = () => {
    this.getLaunchPadData();
    this.getLaunchesData();
  }

  getLaunchPadData = () => {
    this.fetchData('http://localhost:8001/launchpads')
      .then(data => {
        this.setState({ launchPads: data, activeRequests: this.state.activeRequests-1 });
      })
  }

  getLaunchesData = () => {
    this.fetchData('http://localhost:8001/launches')
      .then(data => {
        this.setState({
          launches: data,
          filteredResults: data,
          launchYears: this.getLaunchYears(data),
          activeRequests: this.state.activeRequests-1
        });
      })
  }

  getLaunchYears = (launches) => (
    launches.reduce((acc, launch) => {
      const launchYear = this.formatDate(launch.launch_date_local);
      if (acc.indexOf(launchYear) < 0) {
        acc.push(launchYear);
      }
      return acc;
    }, [])
  )

  formatDate = date => (
    new Intl.DateTimeFormat('en-GB', {
      year: 'numeric'
    }).format(Date.parse(date))
  )

  fetchData = (url) => (
    fetch(url)
      .then((results, data) => {
        return results.json();
      })
  )

  handleFormChanges = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  filterResults = ({ launches, keywords, launchPad, minYear, maxYear }) => {
    const results = launches.filter(({ flight_number, rocket, payloads, launch_site, launch_date_local }) => (
      (this.filterByKeywords(keywords, flight_number, rocket, payloads))
      && (this.filterByLaunchPad(launchPad, launch_site))
      && (this.filterByMinYear(launch_date_local, minYear))
      && (this.filterByMaxYear(launch_date_local, maxYear))
    ))    
    return results;
  }

  filterByKeywords = (keywords, flight_number, rocket, payloads) => (
    flight_number.toString().includes(keywords)
    || rocket.rocket_name.includes(keywords)
    || payloads.filter(({ payload_id }) => (payload_id.includes(keywords))).length > 0
  )

  filterByLaunchPad = (launchPad, launch_site) => (
    launchPad !== 'any' ? launch_site.site_id === launchPad : true
  )

  filterByMinYear = (launch_date_local, minYear) => (
    minYear !== 'any' ? parseInt(this.formatDate(launch_date_local)) >= parseInt(minYear) : true
  )

  filterByMaxYear = (launch_date_local, maxYear) => (
    maxYear !== 'any' ? parseInt(this.formatDate(launch_date_local)) <= parseInt(maxYear) : true
  )

  isValidYearRange = (minYear, maxYear) => (
    (minYear !== 'any' && maxYear !== 'any')
      ? parseInt(minYear) <= parseInt(maxYear)
      : true
  )

  applyClicked = (e) => {
    e.preventDefault();
    this.isValidYearRange(this.state.minYear, this.state.maxYear)
      ? this.setState({ filteredResults: this.filterResults(this.state), errorMessage: '' })
      : this.setErrorMessage('Min Year should be greater than Max Year.')
  }

  setErrorMessage = (message) => {
    message === undefined
      ? this.setState({ errorMessage: '' })
      : this.setState({ errorMessage: message })
  }

  getMissionItems = (results) => (
    results.map((missionItem, idx) => (
      <MissionItemComponent missionItem={missionItem} key={idx} />
    ))
  )

  scrollToSearch = () => {
    const searchNode = ReactDOM.findDOMNode(this.refs.search);
    searchNode.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  showNoResults = () => (
    <div className="no-results">
      No results available for your search criteria.
    </div>
  )

  render = () => (
    <div className="App">
      <LoaderComponent showLoading={this.state.activeRequests > 0} />
      <div className="App-header">
        <div className="brand-text">
          SPACE SAVVY
        </div>
        <div className="headline-text">
          Discover Space Missions
        </div>
        <div className="down-chevron">
          <img src="./img/down-chevron.svg" onClick={this.scrollToSearch} />
        </div>
      </div>
      <div className="App-body" ref="search">
        <SearchComponent
          launchpads={this.state.launchPads}
          launchYears={this.state.launchYears}
          handleFormChanges={this.handleFormChanges}
          keywords={this.state.keywords}
          launchPad={this.state.launchPad}
          minYear={this.state.minYear}
          maxYear={this.state.maxYear}
          applyClicked={this.applyClicked} />
        <div className="warning">{this.state.errorMessage}</div>
        <div>
          {
            this.state.filteredResults.length > 0
              ? this.getMissionItems(this.state.filteredResults)
              : this.showNoResults()
          }
        </div>
        <div className="footer">
          <div className="footer-info"></div>
          <div className="footer-link">
            <a href={"javascript:void(0)"} onClick={this.scrollToSearch}>Back to top</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;