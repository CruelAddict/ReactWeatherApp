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
    }

    componentDidMount() {
        this.getWeather();
    }

    execWeatherRequest(url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.readyState === 4) {
                if (Http.responseText) {
                    if (Http.status === 200) {
                        let weather_data = JSON.parse(Http.responseText);
                        this.parseWeatherData(weather_data)
                    } else this.raiseError('City not found.')
                } else this.raiseError('Failed to connect to the server.')
            }
        }
    }

    parseWeatherData(weather_data) {
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
        fetch(`http://openweathermap.org/img/wn/${icon_code}@2x.png`, {
            method: 'GET',
        }).then(res => res.blob())
            .then(blob => {
                let fileUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                this.setState({
                    isLoading: false,
                    city,
                    coordinates,
                    weather_data: {
                        temperature,
                        wind,
                        humidity,
                        pressure,
                        cloudiness,
                        icon: fileUrl
                    }
                })
            });
    }

    weatherByNameUrl = () =>
        `http://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=${this.state.api_key}`;

    weatherByCoordinatesUrl = () =>
        `http://api.openweathermap.org/data/2.5/weather?lat=${store.getState().geo.coordinates.latitude}&lon=${store.getState().geo.coordinates.longitude}&appid=${this.state.api_key}`;

    getWeather() {
        this.setState({
            isLoading: true
        });
        let url = this.weatherByCoordinatesUrl();
        this.execWeatherRequest(url);
    }

    raiseError(message) {
        console.log(message);
    }
}
