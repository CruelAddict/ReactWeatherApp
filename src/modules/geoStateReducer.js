import Actions from './actions'

export default (state = {permissionGranted: null, coordinates: null}, action) => {
    switch (action.type) {
        case Actions.Types.SET_GEOLOCATION:
            return {
                ...state,
                ...action.payload
            };

        case Actions.Types.SET_MAIN_WEATHER:
            return {
                ...state,
                weatherObj: action.payload.weatherObj
            };

        case Actions.Types.RESET_GEO:
            return action.payload;

        default:
            return state;
    }
}
