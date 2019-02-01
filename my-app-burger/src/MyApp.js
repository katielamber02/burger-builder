import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth';


// var empoyee={
//   company:'levehunt'
// }
// const empl=Object.create(empoyee)
// console.log('empl',empl)
// delete empl.company
// console.log(empl.company)

class MyApp extends Component {
  render() {
    return (

      <Layout>
        <Switch>
        <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' component={BugerBuilder} />

        </Switch>
      </Layout>


    )
  }
}

export default MyApp