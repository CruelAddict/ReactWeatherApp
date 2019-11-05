import React from 'react'
import WeatherPanel from './WeatherPanel'
import MainWeatherPanelComponent from '../components/MainWeatherPanelComponent'
import {connect} from 'react-redux'
import Header from "./Header";
import Actions from "../modules/actions";

const mapStateToProps = state => ({
    geo: state.geo
});

const mapDispatchToProps = dispatch => ({
    setMainWeather: panel => dispatch(Actions.setMainWeather(panel))
});

class MainWeatherPanel extends WeatherPanel {

    constructor() {
        super();
        this.mainLocationRefresh = this.mainLocationRefresh.bind(this)
    }

    componentDidMount() {
        this.setWeather();
        this.setState(
            this.props.geo.weatherObj
        );
    }

    componentDidUpdate(prevProps) {
        let oldData = prevProps.geo.weatherObj;
        let newData = this.props.geo.weatherObj;
        console.log(newData);
        oldData !== newData &&  this.setState(newData);
    }

    setWeather() {
        this.props.setMainWeather(this);
    }

    mainLocationRefresh() {
        this.setState({
            isLoading: true
        });
        this.setWeather();
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

export default connect(mapStateToProps, mapDispatchToProps)(MainWeatherPanel)
