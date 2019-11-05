const Types = {
    CREATE_FAVORITE: "CREATE_FAVORITE",
    DELETE_FAVORITE: "DELETE_FAVORITE",
    SET_GEOLOCATION: "SET_GEOLOCATION",
    SET_FAVORITES_WEATHER: "SET_FAVORITE_WEATHER",
    SET_MAIN_WEATHER: "SET_MAIN_WEATHER"
};

const createFavorite = favorite => ({
    type: Types.CREATE_FAVORITE,
    payload: favorite
});

const deleteFavorite = id => ({
    type: Types.DELETE_FAVORITE,
    payload: id
});

const setGeolocationStatus = newState => dispatch => {
    dispatch({
        type: Types.SET_GEOLOCATION,
        payload: newState
    });
    return Promise.resolve()
};

const setFavoriteWeather = (favorite, id) => dispatch => {
    favorite.getWeather().then(weatherObj => {
        dispatch({
            type: Types.SET_FAVORITES_WEATHER,
            payload: {
                id,
                weatherObj
            }
        });
    }, errorMessage => {
        dispatch({
            type: Types.SET_FAVORITES_WEATHER,
            payload: {
                id,
                weatherObj: {
                    isLoading: false,
                    isFailed: true,
                    errorMessage
                }
            }
        });
    });
};

const setMainWeather = (panel) => dispatch => {
    panel.getWeather().then(weatherObj => {
        console.log('dispatching main weather');
        weatherObj !== false && dispatch({
            type: Types.SET_MAIN_WEATHER,
            payload: {
                weatherObj
            }
        });
    }, errorMessage => {
        dispatch({
            type: Types.SET_MAIN_WEATHER,
            payload: {
                weatherObj: {
                    isLoading: false,
                    isFailed: true,
                    errorMessage
                }
            }
        });
    });
};

export default {
    createFavorite,
    deleteFavorite,
    setGeolocationStatus,
    setFavoriteWeather,
    setMainWeather,
    Types
}
