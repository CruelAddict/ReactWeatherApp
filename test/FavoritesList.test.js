import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import FavoritesList from '../src/containers/FavoritesList';
import store from '../src/modules/store'
import Actions from "../src/modules/actions";



describe ('FavoritesList', () => {

    it('Renders if store is empty', () => {
        const panel = shallow(
            <FavoritesList
                store={store}
            />
        );
        expect(panel).toMatchSnapshot()
    });

    it('Renders if store has items', () => {
        store.dispatch(Actions.createFavorite("London")).then( () => {
            const panel = shallow(
                <FavoritesList
                    store={store}
                />
            );
            expect(panel).toMatchSnapshot()
        });
    });

});
