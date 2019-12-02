import React from 'react';
import SideWeatherPanelComponent from '../src/components/SideWeatherPanelComponent';
import { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

describe ('SideWeatherPanelComponent', () => {

    it('Renders in "loading" state', () => {
        const panel = shallow(
            <SideWeatherPanelComponent state={{isLoading: true}}/>
        );
        expect(panel).toMatchSnapshot()
    });

    it('Displays weather data for a city', () => {
        const panel = shallow(
            <SideWeatherPanelComponent state={{
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

    it('Displays an error if server does not respond', () => {
        const panel = shallow(
            <SideWeatherPanelComponent state={{
                isLoading: false,
                city: "London",
                coordinates: {
                    latitude: 51.51,
                    longitude: -0.13
                },
                isFailed: true,
                weather_data: {
                    cloudiness: "overcast clouds",
                    humidity: 87,
                    icon: "blob:http://localhost:3000/983a1031-dd0b-42bb-a079-8feb35f05a10",
                    pressure: 1016,
                    temperature: 3.9700000000000273,
                    wind: 2.1
                },
                errorMessage: "Сервер не отвечает"
            }}/>
        );
        expect(panel).toMatchSnapshot()
    });

    it('Displays an error if city was not found', () => {
        const panel = shallow(
            <SideWeatherPanelComponent state={{
                isLoading: false,
                city: "London",
                coordinates: {
                    latitude: 51.51,
                    longitude: -0.13
                },
                isFailed: true,
                weather_data: {
                    cloudiness: "overcast clouds",
                    humidity: 87,
                    icon: "blob:http://localhost:3000/983a1031-dd0b-42bb-a079-8feb35f05a10",
                    pressure: 1016,
                    temperature: 3.9700000000000273,
                    wind: 2.1
                },
                errorMessage: "Город не найден"
            }}/>
        );
        expect(panel).toMatchSnapshot()
    });


});
