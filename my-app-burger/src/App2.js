import React,{Component} from 'react'

class Counter extends Component{
	state={count:1}
	render(){
		const {count}=this.state;
		return(
		  <div>
		   <p>This is my state:{count}</p>
		   <DoubleCounter count={count} />
		  </div>
		
		);
	}
}

class DoubleCounter extends Component{
	
	render(){
		const {count}=this.props;
		return(
		 <p>This is my prop: {count}</p>
		
		);
	}
}





export default Counter