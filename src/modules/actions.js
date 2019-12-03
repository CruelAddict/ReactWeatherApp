const Types = {
    CREATE_FAVORITE: "CREATE_FAVORITE",
    DELETE_FAVORITE: "DELETE_FAVORITE",
    SET_GEOLOCATION: "SET_GEOLOCATION",
    SET_FAVORITES_WEATHER: "SET_FAVORITE_WEATHER",
    SET_MAIN_WEATHER: "SET_MAIN_WEATHER",
    RESET_GEO: "RESET_GEO",
    RESET_FAV: "RESET_FAV",
    FETCH_FAVORITE: "FETCH_FAVORITE",
    MARK_AS_POSTED: "MARK_AS_POSTED"
};

const resetGeoStore = state => dispatch => {
    dispatch({
        type: Types.RESET_GEO,
        payload: state
    });
    return Promise.resolve();
};

const resetFavsStore = state => dispatch => {
    dispatch({
        type: Types.RESET_FAV,
        payload: state
    });
    return Promise.resolve();
};

const createFavorite = favorite => dispatch => {
    dispatch({
        type: Types.CREATE_FAVORITE,
        payload: favorite
    });
    return Promise.resolve();
};

const fetchFavorite = favorite => dispatch => {
    dispatch({
        type: Types.FETCH_FAVORITE,
        payload: favorite
    })
};

const markAsPosted = id => dispatch => {
    dispatch({
        type: Types.MARK_AS_POSTED,
        payload:id
    })
};

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
        console.log('onset');
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
    resetGeoStore,
    resetFavsStore,
    fetchFavorite,
    markAsPosted,
    Types
}
