const Types = {
    CREATE_FAVORITE: "CREATE_FAVORITE",
    DELETE_FAVORITE: "DELETE_FAVORITE",
    SET_GEOLOCATION: "SET_GEOLOCATION"
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

export default {
    createFavorite,
    deleteFavorite,
    setGeolocationStatus,
    Types
}
