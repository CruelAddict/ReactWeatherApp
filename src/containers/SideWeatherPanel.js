import React from 'react'
import WeatherPanel from './WeatherPanel'
import SideWeatherPanelComponent from '../components/SideWeatherPanelComponent'
import {connect} from 'react-redux';
import Actions from "../modules/actions";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    deleteFavorite: id => dispatch(Actions.deleteFavorite(id)),
});


class SideWeatherPanel extends WeatherPanel {

    constructor() {
        super();
        this.handleFavoriteRemoval = this.handleFavoriteRemoval.bind(this);
    }

    getWeather() {
        let url = this.weatherByNameUrl();
        this.execWeatherRequest(url);
    }

    handleFavoriteRemoval() {
        this.props.deleteFavorite(this.props.favoriteId)
    }

    render() {
        return (
            <SideWeatherPanelComponent
                state={this.state}
                handleFavoriteRemoval={this.handleFavoriteRemoval}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideWeatherPanel);
