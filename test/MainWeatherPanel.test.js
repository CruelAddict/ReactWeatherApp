import React from 'react';
import {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
import {act} from 'react-dom/test-utils';
import sinon from 'sinon';
const MockXMLHttpRequest = require('mock-xmlhttprequest');

import store from '../src/modules/store'
import MainWeatherPanel from '../src/containers/MainWeatherPanel';
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
    get: ['https://api.openweathermap.org/data/2.5/weather?lat=51.51&lon=-0.13&appid=bf3565940c52aaa3383c1dbc23799bb1', {
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

server.get('https://api.openweathermap.org/data/2.5/weather?lat=123&lon=456&appid=bf3565940c52aaa3383c1dbc23799bb1', {
    status: 404,
    headers: {'Content-Type': 'application/json'},
    body: 'city not found'
});

describe('MainWeatherPanel', () => {

    it('Should display data when loaded', () => {
        store.dispatch(Actions.setGeolocationStatus({
            permissionGranted: true,
            coordinates: {
                latitude: 51.51,
                longitude: -0.13
            }
        })).then( () => {
            panel = mount(
                <MainWeatherPanel
                                  store={store}
                />
            );
        });

        return new Promise(resolve => {
            let waitUntilLoaded = setInterval(() => {
                panel.find('MainWeatherPanel').instance().state.isLoading === false ? resolve(waitUntilLoaded) : null;
            }, 250)
        }).then((waitUntilLoaded) => {
            clearInterval(waitUntilLoaded);
            panel.update();
            expect(panel).toMatchSnapshot();
        });
    });

    it('Should display error message if server does not respond', () => {
        store.dispatch(Actions.resetGeoStore( {
                permissionGranted: true,
                coordinates: { latitude: 123, longitude: 456 }
            }
        )).then( () => {
            panel = mount(
                <MainWeatherPanel
                    store={store}
                />
            );
        });

        return new Promise(resolve => {
            let waitUntilLoaded = setInterval(() => {
                panel.find('MainWeatherPanel').instance().state.isLoading === false ? resolve(waitUntilLoaded) : null;
            }, 250)
        }).then((waitUntilLoaded) => {
            clearInterval(waitUntilLoaded);
            panel.update();
            expect(panel).toMatchSnapshot();
        });
    });

    it('Should initially be loading', () => {
        window.fetch = sinon.stub().returns(setTimeout(()=> Promise.resolve(), 15000));
        store.dispatch(Actions.resetGeoStore( {
                permissionGranted: true,
                coordinates: {
                    latitude: 51.51,
                    longitude: -0.13 }
            }
        )).then( () => {
            console.log('IMPORTANT: '+ store.getState().toString());
            panel = mount(
                <MainWeatherPanel
                    store={store}
                />
            );
            expect(panel).toMatchSnapshot()
        });
    })

});
