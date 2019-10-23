import React, {Component} from 'react'
import HeaderComponent from '../components/HeaderComponent'
import setGeolocation from '../modules/geolocationHandler'

class Header extends Component {
    constructor() {
        super();
        this.refreshGeo = this.refreshGeo.bind(this);
    }

    refreshGeo() {
        setGeolocation(this.props.mainLocationRefresh);
    }

    submitGeoStatus(status) {
        this.props.setGeolocationStatus(status);
    }

    render() {
        return(
            <HeaderComponent refreshGeo={this.refreshGeo}/>
        )
    }
}

export default Header
