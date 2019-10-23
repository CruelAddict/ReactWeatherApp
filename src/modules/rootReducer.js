import favoritesReducer from './favoritesReducer'
import geoReducer from './geoStateReducer'
import {combineReducers} from 'redux'

export default combineReducers({
    favorites: favoritesReducer,
    geo: geoReducer
})
