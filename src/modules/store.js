import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './rootReducer'

const savedItems = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

const initialState = {
    favorites: {
        items: savedItems
    },
    geo: {
        permissionGranted: null,
        coordinates: null
    }
};

export default () => {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    )
}
