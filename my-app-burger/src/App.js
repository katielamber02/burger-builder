
import {Router, Route, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'


const history=createBrowserHistory();

const Home=()=>(
 <div>
  <h2>Home</h2>
 </div>
) 

const About=()=>(
 <div>
  <h2>About</h2>
 </div>
)
const Contacts=()=>(
 <div>
  <h2>Contacts</h2>
 </div>
)

class Navigation extends React.Component{
	render(){
		return(
		<Router history={history}>
		  <div>
		   <ul>
		    <li><Link to='/'>Home</Link></li>
			<li><Link to='/about'>About</Link></li>
			<li><Link to='/contacts'>Contacts</Link></li>
		   </ul>
		   <hr/>
		   
		   <Route exact path='/' component={Home}/>
		   <Route path='/about' component={About}/>
		   <Route path='/contacts' component={Contacts}/>
		  </div>
		
		</Router>
		)
	}
	
}

export default Navigation;

