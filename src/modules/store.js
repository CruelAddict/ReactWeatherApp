import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './rootReducer';



const savedItems = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')).map(value => {
        return {
            ...value,
            isLoading: true
        };
    }) : [];

const initialState = {
    favorites: {
        items: []
    },
    geo: {
        permissionGranted: null,
        coordinates: null
    }
};

const configureStore = () => {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
};

const store = configureStore();

export default store;
