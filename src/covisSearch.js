import React from "react";
import axios from 'axios'
import "./covidData.css";


class CovidSearch extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {

            covidData: '',
            searchValue: '',
            SelectedState: '',
            isError: false,
            validState: false,
            TotalStates: ''
        }

    }

    componentDidMount() {
        this.setState({ isError: false });
        this.setState({ validState: false });

        axios
            .get("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise")
            .then((response) => {
                // setPosts(response)
                this.setState({ covidData: response });

                console.log('response----', response)
                this.setState({ TotalStates: response.data.data.statewise });
                console.log(response.data.data.statewise)

            })
            .catch((error) => {
                console.log('error ----', error)
            });
    }
    handleClick() {
        if (this.state.searchValue === '') {
            console.log('empty')
            this.setState({ isError: true });

            return false;
        } else {
            this.setState({ validState: false });

            this.setState({ isError: false });
            console.log('this is:', this.state.covidData);
            console.log('this is:', this.state.covidData.data.data.statewise);


            const covidStates = this.state.covidData.data.data.statewise
            console.log(covidStates)
            var stateData = covidStates.filter((post) => post.state === this.state.searchValue);
            console.log(stateData)
            this.setState({ SelectedState: stateData });

            if (!stateData[0]) {
                console.log('empty res')
                this.setState({ validState: true });
            }
        }
    }

    handleSearch(event) {
        this.setState({ searchValue: event.target.value });
        this.setState({ isError: false });
        this.setState({ validState: false });

        console.log(this.state.TotalStates)
    };

    render() {
        const { SelectedState, isError, validState, covidData, TotalStates } = this.state
        return (
            <div id="car-list">
                <h1 className="title">Covid-19 StateWise Search</h1>
                <div className="hr-line"><hr /></div>

                <div className="covidData">

                    <div className="covidData__input">
                        <input
                            type="text"
                            placeholder="Enter State Name"
                            onChange={this.handleSearch}
                        />
                        <button onClick={() => this.handleClick()}>
                            Search
                        </button>
                    </div>
                </div>
                
                <div>{isError ? <h4 className="InputError">Please enter state to continue</h4> : null}</div>
                <div>{validState ? <h4 className="InputError">Please enter valid state to continue</h4> : null}</div>

                <div>{validState ?
                    <div>
                        <h4>Here are some of the valid state names from the API response</h4>
                        <div>
                            {TotalStates[0] ? <div>
                                <ul id="limheight">

                                    {TotalStates.map((student, index) => (
                                        <li className="states-Ex" key={student.state}>
                                            {student.state}
                                        </li>
                                    ))}
                                </ul>

                            </div> : null}
                        </div>
                    </div> : null}
                </div>

                {/* <div className="hr-line"><hr /></div> */}

                {SelectedState[0] ?
                    <div className="covid19-info">
                        <p>State Name : {SelectedState[0].state.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>

                        <p>Active Cases : {SelectedState[0].active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                        <p>Death Cases: {SelectedState[0].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                        <p>Recovered Cases: {SelectedState[0].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                        <p>Confirmed Cases : {SelectedState[0].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                        {/* <p>Deaths Today : {deathCases}</p> */}

                        {/* <p>Recovered Today : {recoveredCases}</p> */}
                    </div>
                    : null
                }
            </div>
        );
    }
}
export default CovidSearch;