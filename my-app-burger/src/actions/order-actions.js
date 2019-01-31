import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAILED,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
}  from  '../action-types'
import axios from '../axios-orders'

export const purchaseBurgerSuccess=(orderId,orderData)=>{
    return{
        type:PURCHASE_BURGER_SUCCESS,
        orderData:orderData,
        id:orderId
    }
   
}

export const purchaseBurgerFailed=error=>{
    return{
        type:PURCHASE_BURGER_FAILED,
        error:error
    }
    
}
export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    };
};
export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post( '/orders.json', orderData )
            .then( response => {
                console.log( response.data );
                dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchaseBurgerFailed( error ) );
            } );
    };
};
export const purchaseInit = () => {
    return {
        type:PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type:FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get( '/orders.json' )
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};