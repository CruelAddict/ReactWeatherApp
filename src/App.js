import React from 'react';
import FavoritesList from './containers/FavoritesList'
import MainWeatherPanel from './containers/MainWeatherPanel'
import setGeoStatus from './modules/geolocationHandler'
import {connect} from 'react-redux'
import Actions from "./modules/actions";

const mapStateToProps = state => ({
    permissionGranted: state.geo.permissionGranted,
    coordinates: state.geo.coordinates
});

const mapDispatchToProps = dispatch => ({
    createFavorite: item => dispatch(Actions.createFavorite(item)),
});


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            coordinates: props.coordinates
        }
    }

    fetchFavorites = async () => {
        let response = await fetch('http://127.0.0.1:3000/favourites');
        let items = await response.json();
        items.map(item => {this.props.createFavorite(item.name)})
    };


    componentDidMount() {
        this.fetchFavorites();
        setGeoStatus();
    }

    render() {
        return this.props.permissionGranted === null ? null
            :
            <div id={"app"}>
                <MainWeatherPanel coordinates={this.props.coordinates}/>
                <FavoritesList/>
            </div>
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
