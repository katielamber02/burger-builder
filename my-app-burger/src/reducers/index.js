
import { combineReducers } from 'redux'
import inredientReducer from './ingredient-reducer'
import orderReducer from './order-reducer'

export default combineReducers({
    ingredients:inredientReducer,
    orders:orderReducer
})