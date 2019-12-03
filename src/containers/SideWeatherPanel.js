import React from 'react'
import WeatherPanel from './WeatherPanel'
import SideWeatherPanelComponent from '../components/SideWeatherPanelComponent'
import {connect} from 'react-redux';
import Actions from "../modules/actions";
import {NotificationManager} from 'react-notifications';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    deleteFavorite: id => dispatch(Actions.deleteFavorite(id)),
    setFavoriteWeather: (favorite, id) => dispatch(Actions.setFavoriteWeather(favorite, id)),
    markAsPosted: id => dispatch(Actions.markAsPosted(id))
});


class SideWeatherPanel extends WeatherPanel {

    constructor() {
        super();
        this.handleFavoriteRemoval = this.handleFavoriteRemoval.bind(this);
        this.setWeather = this.setWeather.bind(this);
        this.postFavourite = this.postFavourite.bind(this)
    }

    componentDidMount() {
        this.setWeather();
        this.setState(
            this.props.favorites.items.filter(value => (value.id === this.props.favoriteId))[0].weatherObj
        );
    }

    async postFavourite(newState) {
        await   this.props.markAsPosted(this.props.favoriteId);
        console.log('posting favorite');
        fetch('http://127.0.0.1:3000/favourites/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name : newState.city
            })
        }).then(response => {
            console.log(response);
        }, response => {
            console.log('Error!');
            console.log(response);
            NotificationManager.error('К сожалению, после перезагрузки страницы изменения будут потеряны', 'Не удалось сохранить избранный город');
        });
    }

    componentDidUpdate(prevProps) {
        let favoriteObj = this.props.favorites.items.filter(value => (value.id === this.props.favoriteId))[0];

        let oldData = prevProps.favorites.items.filter(value => (value.id === this.props.favoriteId))[0].weatherObj;
        let newData = favoriteObj.weatherObj;
        if(!favoriteObj.pushedToServer && !newData.isFailed) {
            oldData === undefined && newData !== undefined && this.postFavourite(newData);
        }
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
        console.log(`deleting ${this.state.city}`);
        fetch('http://127.0.0.1:3000/favourites/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name : this.state.city
            })
        }).then(response => {
            !response.ok && NotificationManager.error('Изменения могут быть не сохранены.', 'Произошла ошибка')
        }, response => {
            NotificationManager.error('Изменения могут быть не сохранены.', 'Произошла ошибка')
        });
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
