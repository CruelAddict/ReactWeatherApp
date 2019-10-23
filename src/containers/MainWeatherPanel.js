import React from 'react'
import WeatherPanel from './WeatherPanel'
import MainWeatherPanelComponent from '../components/MainWeatherPanelComponent'
import {connect} from 'react-redux'
import Header from "./Header";

const mapStateToProps = state => ({
    geo: state.geo
});

class MainWeatherPanel extends WeatherPanel {

    constructor() {
        super();
        this.mainLocationRefresh = this.mainLocationRefresh.bind(this)
    }

    mainLocationRefresh() {
        this.setState({
            isLoading: true
        });
        this.getWeather()
    }

    render() {
        return (
            <div>
                <Header mainLocationRefresh={this.mainLocationRefresh}/>
                <MainWeatherPanelComponent state={this.state}/>
            </div>

        )
    }
}

export default connect(mapStateToProps)(MainWeatherPanel)
