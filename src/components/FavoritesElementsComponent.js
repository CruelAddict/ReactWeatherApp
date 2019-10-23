import React from 'react'
import {connect} from 'react-redux'
import SideWeatherPanel from '../containers/SideWeatherPanel'

const mapStateToProps = state => ({
    items : state.favorites.items
});

const FavoritesElementComponent = props => {
        return <div className={"favorites-container"}>
            {props.items.map(item => (
                <SideWeatherPanel
                    city={item.name}
                    key={item.id}
                    favoriteId={item.id}
                />
            ))}
            </div>
};

export default connect(mapStateToProps)(FavoritesElementComponent)
