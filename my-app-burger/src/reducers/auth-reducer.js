
import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
 } from '../action-types'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

function authReducer(state=initialState,action){
    switch ( action.type ) {
        case AUTH_START:
         return {
             ...state,
             loading:true
         }
        case AUTH_SUCCESS: 
        return {
            ...state,
            token:action.idToken,
            userId:action.userId,
            loading:false,
            error:null
        }
        case AUTH_FAIL:
        return {
            ...state,
            loading:false,
            error:action.error
        }
        
        case AUTH_LOGOUT:
         return {
             ...state,
             token:null,
             userId:null

         }
        //case SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
}
export default authReducer