import Actions from './actions'

export default (state = {permissionGranted: null, coordinates: null}, action) => {
    switch (action.type) {
        case Actions.Types.SET_GEOLOCATION:
            return action.payload;
        default:
            return state;
    }
}
