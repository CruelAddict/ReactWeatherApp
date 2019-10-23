import store from '../index'
import Actions from "./actions";

const defaultCoordinates = {
    latitude: 51.507351,
    longitude: -0.127758
};

export default (callback) => {
    navigator.geolocation ?
        navigator.geolocation.getCurrentPosition((position) => {
            store.dispatch(Actions.setGeolocationStatus({
                    permissionGranted: true,
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
            })).then(callback)
        }, () => {
            store.dispatch(Actions.setGeolocationStatus({
                permissionGranted: false,
                coordinates: defaultCoordinates
            })).then(callback);
        })
        :
        console.log('Not supported')
    return Promise.resolve()
}
