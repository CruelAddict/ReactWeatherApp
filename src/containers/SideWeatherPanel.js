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
    setFavoriteWeather: (favorite, id) => dispatch(Actions.setFavoriteWeather(favorite, id))
});


class SideWeatherPanel extends WeatherPanel {

    constructor() {
        super();
        this.handleFavoriteRemoval = this.handleFavoriteRemoval.bind(this);
        this.setWeather = this.setWeather.bind(this);
    }

    componentDidMount() {
        this.setWeather();
        this.setState(
            this.props.favorites.items.filter(value => (value.id === this.props.favoriteId))[0].weatherObj
        );
    }

    componentDidUpdate(prevProps) {
        let oldData = prevProps.favorites.items.filter(value => (value.id === this.props.favoriteId))[0].weatherObj;
        let newData = this.props.favorites.items.filter(value => (value.id === this.props.favoriteId))[0].weatherObj;
        oldData !== newData &&  this.setState(newData);
    }

    setWeather() {
        this.props.setFavoriteWeather(this, this.props.favoriteId);
    }

    getWeather() {
        return new Promise( (resolve, reject) => {
                let url = this.weatherByNameUrl();
                this.execWeatherRequest(url).then(weatherObj => (resolve(weatherObj)),
                    errorMsg => (reject(errorMsg)));
            }
        );
    }

    handleFavoriteRemoval() {
        this.props.deleteFavorite(this.props.favoriteId);
    }

    render() {
        return (
                <SideWeatherPanelComponent
                    state={this.state}
                    handleFavoriteRemoval={this.handleFavoriteRemoval}
                    setWeather={this.setWeather}
                />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideWeatherPanel);
