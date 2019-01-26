import React, { Component, Fragment } from 'react'
//import Auth from '../../hoc/Auth'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/UI/Modal/Modal';

import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';

import Spinner from './../../components/UI/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class BugerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false

    }
    componentDidMount() {
        console.log(this.props)
    }
    componentWillMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })

            })
            .then(err => this.setState({ error: true }))
    }
    purchaseCancelled = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinued = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
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
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });


    }
    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner />
        if (this.state.ingredients) {

            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}

                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}

                    />

                </Fragment>

            )
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinued}
                purchaseCancelled={this.purchaseCancelled}
                totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BugerBuilder, axios)