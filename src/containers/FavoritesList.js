import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from "../modules/actions";
import FavoritesListHeader from '../components/FavoritesListHeader'
import FavoritesElements from './FavoritesElements'
import {NotificationManager} from 'react-notifications';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    createFavorite: item => dispatch(Actions.createFavorite(item)),
});


class FavoritesList extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            favoritesInput: ""
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.props.favorites.items.map(item => item.name).includes(this.state.favoritesInput)){
            this.props.createFavorite(this.state.favoritesInput);
        } else {
            NotificationManager.error('Город уже находится в списке')
        }
    }

    handleChange(event) {
        this.setState({favoritesInput: event.target.value})
    }

    render() {
        return (
            <div>
                <FavoritesListHeader
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    state={this.state}
                />
                <FavoritesElements/>
            </div>

        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(
    FavoritesList
)
