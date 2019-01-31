import React, { Component } from 'react'
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import {purchaseInit} from '../../actions/order-actions'

class Checkout extends Component {
    // state = {
    //     ingredients:null,
    //     price:0
    //     // ingredients: {
    //     //     salad:1,
    //     //     meet:1,
    //     //     cheese:1,
    //     //     bacon:1
    //     // },
    //     // price: 0
    // }
    //     componentWillMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    // }
    componentWillMount(){
       this.props.onPurchaseInit()
       //it is too late in Checkout thus move it to BB
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchasedRedirect=this.props.purchased? <Redirect to='/' />:null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients.ingredients,
        purchased:state.orders.purchased


    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onPurchaseInit:()=>dispatch(purchaseInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);


// import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

// import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

// import ContactData from './ContactData/ContactData';

// class Checkout extends Component {
//     state = {
//         ingredients: null,
//         price: 0
//     }

//     componentWillMount () {
//         const query = new URLSearchParams( this.props.location.search );
//         const ingredients = {};
//         let price = 0;
//         for ( let param of query.entries() ) {
//             // ['salad', '1']
//             if (param[0] === 'price') {
//                 price = param[1];
//             } else {
//                 ingredients[param[0]] = +param[1];
//             }
//         }
//         this.setState( { ingredients: ingredients, totalPrice: price } );
//     }

//     checkoutCancelledHandler = () => {
//         this.props.history.goBack();
//     }

//     checkoutContinuedHandler = () => {
//         this.props.history.replace( '/checkout/contact-data' );
//     }

//     render () {
//         return (
//             <div>
//                 <CheckoutSummary
//                     ingredients={this.state.ingredients}
//                     checkoutCancelled={this.checkoutCancelledHandler}
//                     checkoutContinued={this.checkoutContinuedHandler} />
//                 <Route 
//                     path={this.props.match.path + '/contact-data'} 
//                     render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
//             </div>
//         );
//     }
// }

// export default Checkout;