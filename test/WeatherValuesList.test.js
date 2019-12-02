import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import WeatherValuesList from '../src/components/WeatherValuesList';


describe ('WeatherValuesList', () => {

    it('Displays weather data items for a city', () => {
        const panel = shallow(
            <WeatherValuesList state={{
                isLoading: false,
                city: "London",
                coordinates: {
                    latitude: 51.51,
                    longitude: -0.13
                },
                isFailed: false,
                weather_data: {
                    cloudiness: "overcast clouds",
                    humidity: 87,
                    icon: "blob:http://localhost:3000/983a1031-dd0b-42bb-a079-8feb35f05a10",
                    pressure: 1016,
                    temperature: 3.9700000000000273,
                    wind: 2.1
                }
            }}/>
        );
        expect(panel).toMatchSnapshot()
    });

});
