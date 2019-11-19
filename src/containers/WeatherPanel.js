import {Component} from 'react'
import store from '../index'

const api_key = 'bf3565940c52aaa3383c1dbc23799bb1';

export default class WeatherPanel extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            api_key,
        };

        this.getWeather = this.getWeather.bind(this);
        this.weatherByNameUrl = this.weatherByNameUrl.bind(this);
        this.weatherByCoordinatesUrl = this.weatherByCoordinatesUrl.bind(this);
        this.execWeatherRequest = this.execWeatherRequest.bind(this);
        this.parseWeatherData = this.parseWeatherData.bind(this);
        this.getIcon = this.getIcon.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
            isFailed: false
        });
    }

    execWeatherRequest(url) {
        return new Promise( (resolve, reject) => {
            console.log('executing request');
            const Http = new XMLHttpRequest();
            Http.open("GET", url);
            Http.send();
            Http.onreadystatechange = (e) => {
                if (Http.readyState === 4) {
                    if (Http.responseText) {
                        if (Http.status === 200) {
                            let weather_data = JSON.parse(Http.responseText);
                            this.parseWeatherData(weather_data).then(weatherObj => resolve(weatherObj),
                                errorObj => reject(errorObj))
                        } else Http.status === 404 ? reject('Город не найден') : reject('Отказ сервера')
                    } else reject('Сервер не отвечает')
                }
            }
        });
    }

    parseWeatherData(weather_data) {
        return new Promise((resolve, reject) => {
            console.log('parsing data');
            let temperature = weather_data['main']['temp'] - 273.15;
            let wind = weather_data['wind']['speed'];
            let humidity = weather_data['main']['humidity'];
            let pressure = weather_data['main']['pressure'];
            let coordinates = {
                longitude: weather_data['coord']['lon'],
                latitude: weather_data['coord']['lat']
            };
            let city = weather_data['name'];
            let cloudiness = weather_data['weather'][0]['description'];
            let icon_code = weather_data['weather'][0]['icon'];
            this.getIcon(icon_code).then(res => res.blob())
                .then(blob => {
                    let fileUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    console.log('weather data parsed');
                    resolve ({
                        city,
                        coordinates,
                        isLoading: false,
                        isFailed: false,
                        weather_data: {
                            temperature,
                            wind,
                            humidity,
                            pressure,
                            cloudiness,
                            icon: fileUrl
                        }
                    })
                }, () => {reject('Сервер не отвечает')});
        });
    }

    getIcon(icon_code) {
        return fetch(`https://openweathermap.org/img/wn/${icon_code}@2x.png`, {
            method: 'GET',
        })
    }

    weatherByNameUrl = () =>
        `http://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=${this.state.api_key}`;

    weatherByCoordinatesUrl = () =>
        `http://api.openweathermap.org/data/2.5/weather?lat=${store.getState().geo.coordinates.latitude}&lon=${store.getState().geo.coordinates.longitude}&appid=${this.state.api_key}`;

    getWeather() {
        return new Promise( (resolve, reject) => {
            let url = this.weatherByCoordinatesUrl();
                this.execWeatherRequest(url).then(
                    weatherObj => (resolve(weatherObj)),
                    errorMsg => (reject(errorMsg)));
            }
        );
    }

    raiseError(message) {
        console.log(message);
    }
}
