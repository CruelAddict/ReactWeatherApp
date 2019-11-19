import React from 'react';
import HeaderComponent from '../src/components/HeaderComponent';
import { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() })

describe ('HeaderComponent', () => {
    it('Should render successfully', () => {
        const header = shallow(
            <HeaderComponent/>
        );
        expect(header).toMatchSnapshot()
    });

});
