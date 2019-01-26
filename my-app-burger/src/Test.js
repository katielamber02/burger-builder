import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database';
//import * as firebase from 'firebase'
import axios from 'axios'

const firebaseConfig={
    apiKey: "AIzaSyAdDIK8mlo9OoI0lZbuc0ENeq81GrFn5vg",
    authDomain: "fir-starter-mine.firebaseapp.com",
    databaseURL: "https://fir-starter-mine.firebaseio.com",
    projectId: "fir-starter-mine",
    storageBucket: "fir-starter-mine.appspot.com",
    messagingSenderId: "97976473971"
  };

firebase.initializeApp(firebaseConfig)
const instance = axios.create({
    baseURL: 'https://fir-starter-mine.firebaseio.com'
});

export default class Test extends Component {
    state={
       speed:10
    }
    componentDidMount(){
        // const rootRef= firebase.database().ref()
        
        // const speedRef=rootRef.child('speed')
        // speedRef.on('value',snap=>{
        //     console.log(snap.val())
        //     this.setState({
        //         speed:snap.val()
        //     })
        // })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Mary',
                address: {
                    street: 'MyStreet 1',
                    zipCode: '41351',
                    country: 'Ukraine'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
       instance.post('/neworders.json',order)
         .then(response=>console.log(response.data))
         .then(err=>console.log(err))

  }
   
  render() {
    return (
      <div>
       {this.state.speed}
      </div>
    )
  }
}
