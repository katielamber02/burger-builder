import React, { Component, Fragment } from 'react'
//import Auth from '../../hoc/Auth'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/UI/Modal/Modal';

import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';

import Spinner from './../../components/UI/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import {addIngredient,removeIngredient,initIngredients} from '../../actions/ingredients-actions'
import {connect} from 'react-redux'


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };


class BugerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        //ingredients: null,
        //totalPrice: 4,
        purchasing: false,
        //loading: false,
        //error: false

    }
    // componentDidMount() {
    //     console.log(this.props)
    // }
    // componentWillMount() {
    //     axios.get('/ingredients.json')
    //         .then(response => {
    //             this.setState({ ingredients: response.data })

    //         })
    //         .then(err => this.setState({ error: true }))
    // }
    componentDidMount(){
        this.props.onInitIngredients()

    }
    purchaseCancelled = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinuedHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            //search: '?' + queryString
        });
        // this.setState( { loading: true } );
        // //console.log(this.state.loading)
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Mary',
        //         address: {
        //             street: 'MyStreet 1',
        //             zipCode: '41351',
        //             country: 'Ukraine'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        //  axios.post('/orders.json',order)
        //  .then(response=>{
        //      this.setState({loading:false,purchasing: false})
        //      console.log(response)})
        //  .then(err=>this.setState({loading:false,purchasing: false}))


    }
    purchaseHandler = () => {
        //console.log(this.state.purchasing)
        this.setState({
            purchasing: true
        })
    }
    purchaseCancel = () => {
        this.setState({
            purchasing: false
        })
    }
    
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) return
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });


    // }
    updatePurchaseState ( igredients ) {
        const sum = Object.keys( igredients )
            .map( igKey => {
                return igredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }
    render() {
       
        console.log('BB',this.props.ings)
        console.log('BB',this.props.price)
        const disabledInfo = { ...this.props.ings }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner />
        if (this.props.ings) {

            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngr}
                        ingredientRemoved={this.props.onRemoveIng}
                        price={this.props.price}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}

                    />

                </Fragment>

            )
            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCancelled={this.purchaseCancelled}
                totalPrice={this.props.price}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }



        console.log('purchasing', this.state.purchasing)
        return (
            <Fragment>

                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>

            </Fragment>



        )
    }
}
const mapStateToProps=state=>{
    return {
        ings:state.ingredients.ingredients,
        price:state.ingredients.totalPrice,
        error:state.ingredients.error
        
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAddIngr:(ingName)=>dispatch(addIngredient(ingName)),
        onRemoveIng:(ingName)=>dispatch(removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BugerBuilder,axios))