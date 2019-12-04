import React from 'react';
import ReactDOM from 'react-dom';
import {AppConnected} from './App';
import {Provider} from 'react-redux';
import store from './modules/store';
import './styles/main.scss';

store.subscribe(() => {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.items.map(value => {
        let valueClone = {...value};
        delete valueClone['weatherObj'];
        console.log(valueClone);
        return valueClone;
    })))
});

ReactDOM.render(
    <Provider store={store}>
        <AppConnected/>
    </Provider>,
    document.getElementById('root'));

export default store
