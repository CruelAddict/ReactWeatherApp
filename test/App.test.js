import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import {App} from '../src/app';
import store from '../src/modules/store'



describe ('App', () => {

    it('Renders successfully', () => {
        const app = shallow(
            <App
                store={store}
            />
        );
        expect(app).toMatchSnapshot()
    });

});
