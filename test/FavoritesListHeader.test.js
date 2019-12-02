import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import FavoritesListHeader from '../src/components/FavoritesListHeader';


describe ('FavoritesListHeader', () => {
    it('Should render successfully', () => {
        const header = shallow(
            <FavoritesListHeader state={{favoritesInput: ""}}/>
        );
        expect(header).toMatchSnapshot()
    });

});
