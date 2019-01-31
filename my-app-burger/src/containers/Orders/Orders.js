import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'
import {fetchOrders} from '../../actions/order-actions'

import Spinner from './../../components/UI/UI/Spinner/Spinner';

class Orders extends Component {
   
    componentDidMount(){
        this.props.onOrdersInit()
    }

    render () {
        let orders=<Spinner />
        if(!this.props.loading){
            orders=this.props.orders.map(order => (
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
            ))

        }
        return (
            <div>
                {orders}
                
            </div>
        );
    }
}
export const mapStateToProps=state=>{
    return {
        orders:state.orders.orders,
        loading:state.orders.loading

    }
}
export const mapDispatchToProps=dispatch=>{
    return{
        onOrdersInit:()=>dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));