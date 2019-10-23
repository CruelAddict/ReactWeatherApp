import React from 'react'
import WeatherValuesList from './WeatherValuesList'

export default (props) => {
    if (props.state.isLoading) return <div className={"loading-main"}>
        <h4 className={"loading-title-main"}>Подождите, данные загружаются</h4>
        <div className={"spinner-container"}>
            <i className={"fa fa-refresh fa-spin fa-4x"}></i>
        </div>
    </div>;
    else
        return (
            <div className={"main-weather-panel-container"}>
                <div className={"main-weather-panel-main-data"}>
                    <div className={"main-city-name-container"}>
                        <h2>{props.state.city}</h2>
                    </div>
                    <div className={"icon-cell"}>
                        <div className={"icon-container"}>
                            <img src={props.state.weather_data.icon} alt={"weather icon"}/>
                        </div>
                    </div>
                    <div className={"temperature-container"}>
                        <span>{props.state.weather_data.temperature.toFixed(0)}°С</span>
                    </div>
                </div>
                <WeatherValuesList state={props.state}/>
            </div>
        )
}

