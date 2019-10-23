import React from 'react';
import FavoritesList from './containers/FavoritesList'
import MainWeatherPanel from './containers/MainWeatherPanel'
import setGeoStatus from './modules/geolocationHandler'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
    permissionGranted: state.geo.permissionGranted,
    coordinates: state.geo.coordinates
});


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            coordinates: props.coordinates
        }
    }

    componentDidMount() {
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


export default connect(mapStateToProps)(App);
