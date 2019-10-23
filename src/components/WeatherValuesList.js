import React from 'react'

export default (props) => {
    return <div className={"weather-value-list"}>
        <div className={"weather-value-row"}>
            <span className={"weather-value-key"}>Ветер</span>
            <span className={"weather-value-value"}>{props.state.weather_data.wind} m/s</span>
        </div>
        <div className={"weather-value-row"}>
            <span className={"weather-value-key"}>Облачность</span>
            <span className={"weather-value-value"}>{props.state.weather_data.cloudiness.split(' ').map((s) =>
                s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</span>
        </div>
        <div className={"weather-value-row"}>
            <span className={"weather-value-key"}>Давление</span>
            <span className={"weather-value-value"}>{props.state.weather_data.pressure} hpa</span>
        </div>
        <div className={"weather-value-row"}>
            <span className={"weather-value-key"}>Влажность</span>
            <span className={"weather-value-value"}>{props.state.weather_data.humidity} %</span>
        </div>
        <div className={"weather-value-row"}>
            <span className={"weather-value-key"}>Координаты</span>
            <span
                className={"weather-value-value"}>[{props.state.coordinates.longitude.toFixed(2)}, {props.state.coordinates.latitude.toFixed(2)}]</span>
        </div>
    </div>
}
