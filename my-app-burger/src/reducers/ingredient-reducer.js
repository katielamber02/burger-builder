import {
    ADD_INGR,
    REMOVE_INGR,
    SET_INGREDINENTS,
    FETCH_INGREDIENTS_FAILED
} from '../action-types'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const initialState={
  
    ingredients:null,
    totalPrice:4,
    error:false,
    loading:false
   
}
export default function(state=initialState,action){
    switch(action.type){
        case ADD_INGR:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        };
        case REMOVE_INGR:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
        case SET_INGREDINENTS:
        return{
            ...state,
            ingredients:action.ingredients,
            error:false,
            totalPrice:4
        }
        case FETCH_INGREDIENTS_FAILED:
        return{
            ...state,
            error:true
        }
        default:
        return state
    }
    
}
