import { 
    ADD_INGR,
     REMOVE_INGR,
     SET_INGREDINENTS,
     FETCH_INGREDIENTS_FAILED
    } from '../action-types'
import axios from '../axios-orders'

export const addIngredient = name => {
    return {
        type: ADD_INGR,
        ingredientName: name
    }
}

export const removeIngredient = name => {
    return {
        type: REMOVE_INGR,
        ingredientName: name
    }
}
export const setIngredients=(ingredients)=>{
    return {
        type:SET_INGREDINENTS,
        ingredients:ingredients

    }
}
export const fetchIngredientsFailed=(error)=>{
    return{
        type:FETCH_INGREDIENTS_FAILED,
        error:error
    }
}
export const initIngredients=()=>{
    return dispatch=>{
        axios.get('/ingredients.json')
        .then(response=>dispatch(setIngredients(response.data)))
        .catch(error=>dispatch(fetchIngredientsFailed(error)))
        
    }
}