import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './rootReducer'
import store from "../index";

const savedItems = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')).map(value => {
        return {
            ...value,
            isLoading: true
        };
    }) : [];

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
