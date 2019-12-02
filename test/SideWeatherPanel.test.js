import React from 'react';
import {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
import {act} from 'react-dom/test-utils';
import sinon from 'sinon';
const MockXMLHttpRequest = require('mock-xmlhttprequest');

import store from '../src/modules/store'
import SideWeatherPanel from '../src/containers/SideWeatherPanel';
import Actions from "../src/modules/actions";

var panel;

window.fetch = sinon.stub();

const imgData = 'fakeData';

window.URL.createObjectURL = sinon.stub().returns('fakeURL');

const blobStub = () => Promise.resolve();

const mockApiResponse = (body = {}) => {
    return {
        status: 200,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
        blob: blobStub
    };
};

window.fetch.returns(Promise.resolve(mockApiResponse(imgData)));


Enzyme.configure({adapter: new Adapter()});

const server = MockXMLHttpRequest.newServer({
    get: ['https://api.openweathermap.org/data/2.5/weather?q=London&appid=bf3565940c52aaa3383c1dbc23799bb1', {
        // status: 200 is the default
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "coord": {"lon": -0.13, "lat": 51.51},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
            "base": "stations",
            "main": {"temp": 280.6, "pressure": 1011, "humidity": 81, "temp_min": 279.82, "temp_max": 281.48},
            "visibility": 10000,
            "wind": {"speed": 2.6, "deg": 360},
            "clouds": {"all": 75},
            "dt": 1574004909,
            "sys": {"type": 1, "id": 1412, "country": "GB", "sunrise": 1573975285, "sunset": 1574006980},
            "timezone": 0,
            "id": 2643743,
            "name": "London",
            "cod": 200
        }),
    }],
}).install();

server.get('https://api.openweathermap.org/data/2.5/weather?q=CityDoesNotExist&appid=bf3565940c52aaa3383c1dbc23799bb1', {
    status: 404,
    headers: {'Content-Type': 'application/json'},
    body: 'city not found'
});


server.get('https://api.openweathermap.org/data/2.5/weather?q=ServerBroke&appid=bf3565940c52aaa3383c1dbc23799bb1', {
    status: 500,
    headers: {'Content-Type': 'application/json'},
    body: ''
});


describe('SideWeatherPanel', () => {

    it('Should display data when loaded', () => {
        store.dispatch(Actions.createFavorite("London")).then( () => {
            panel = mount(
                <SideWeatherPanel
                    favoriteId={0}
                    city={"London"}
                    store={store}
                />
            );
        });

        return new Promise(resolve => {
            let waitUntilLoaded = setInterval(() => {
                panel.find('SideWeatherPanel').instance().state.isLoading === false ? resolve(waitUntilLoaded) : null;
            }, 250)
        }).then((waitUntilLoaded) => {
            clearInterval(waitUntilLoaded);
            panel.update();
            expect(panel).toMatchSnapshot();
        });
    });

    it('Should display error message if city does not respond', () => {
        store.dispatch(Actions.createFavorite("ServerBroke")).then( () => {
            panel = mount(
                <SideWeatherPanel
                    favoriteId={1}
                    city={"ServerBroke"}
                    store={store}
                />
            );
        });

        return new Promise(resolve => {
            let waitUntilLoaded = setInterval(() => {
                console.log(panel.find('SideWeatherPanel').instance().state);
                panel.find('SideWeatherPanel').instance().state.isLoading === false ? resolve(waitUntilLoaded) : null;
            }, 250)
        }).then((waitUntilLoaded) => {
            clearInterval(waitUntilLoaded);
            panel.update();
            expect(panel).toMatchSnapshot();
        });
    });

    it('Should display error message if city not found', () => {
        store.dispatch(Actions.createFavorite("CityDoesNotExist")).then( () => {
            panel = mount(
                <SideWeatherPanel
                    favoriteId={2}
                    city={"CityDoesNotExist"}
                    store={store}
                />
            );
        });

        return new Promise(resolve => {
            let waitUntilLoaded = setInterval(() => {
                console.log(panel.find('SideWeatherPanel').instance().state);
                panel.find('SideWeatherPanel').instance().state.isLoading === false ? resolve(waitUntilLoaded) : null;
            }, 250)
        }).then((waitUntilLoaded) => {
            clearInterval(waitUntilLoaded);
            panel.update();
            expect(panel).toMatchSnapshot();
        });
    });


    it('Should initially be loading', () => {
        window.fetch = sinon.stub().returns(setTimeout(()=> Promise.resolve(), 15000));
        store.dispatch(Actions.createFavorite("London")).then( () => {
            panel = mount(
                <SideWeatherPanel
                    favoriteId={3}
                    city={"London"}
                    store={store}
                />
            );
        }).then(() => {
            panel.update();
            expect(panel).toMatchSnapshot();
        });
    });

});
