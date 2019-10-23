import React from 'react'
import WeatherValuesList from './WeatherValuesList'

export default (props) => {
    if (props.state.isLoading) return <div className={"side-weather-panel-container"}>
        <div className={"side-weather-panel-main-data"}>
            <div className={"side-city-name-container"}>
                <h2>{props.state.city}</h2>
            </div>
            <div className={"side-temperature-container"}>
            </div>
            <div className={"side-icon-cell"}>
                <div>
                </div>
            </div>
            <div className={"delete-favorite-button-container"}>
                <button
                    onClick={props.handleFavoriteRemoval}
                    className={"delete-favorite favorites-action-button"}>×</button>
            </div>
        </div>
        <div className={"loading-side"}>
            <h4 className={"loading-title-side"}>Подождите, данные загружаются</h4>
            <div className={"spinner-container"}>
                <i className={"fa fa-refresh fa-spin fa-4x"}></i>
            </div>
        </div>
    </div>;
    else
        return (
            <div className={"side-weather-panel-container"}>
                <div className={"side-weather-panel-main-data"}>
                    <div className={"side-city-name-container"}>
                        <h2>{props.state.city}</h2>
                    </div>
                    <div className={"side-temperature-container"}>
                        <span>{props.state.weather_data.temperature.toFixed(0)}°С</span>
                    </div>
                    <div className={"side-icon-cell"}>
                        <div className={"side-icon-container"}>
                            <img src={props.state.weather_data.icon} alt={"weather icon"}/>
                        </div>
                    </div>
                    <div className={"delete-favorite-button-container"}>
                        <button
                            onClick={props.handleFavoriteRemoval}
                            className={"delete-favorite favorites-action-button"}>×</button>
                    </div>
                </div>
                <div className={"side-weather-items"}>
                    <WeatherValuesList state={props.state}/>
                </div>
            </div>
        )
}

