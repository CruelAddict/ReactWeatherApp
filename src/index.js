import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './modules/store'
import './styles/main.scss'

const store = configureStore();

store.subscribe(()=>{
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.items))
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

export default store
