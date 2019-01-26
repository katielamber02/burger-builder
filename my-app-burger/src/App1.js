import React from 'react';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';



const Links=()=>(
 <nav>
   <NavLink to="/">Homes</NavLink>
   <NavLink to="/about">About</NavLink>
   <NavLink to="/contacts">Contacts</NavLink>
 </nav>
) 
const App1=()=>(
   <Router>
     <div>
	 <Links />
      <Route exact path='/' render={()=> <h1>Home</h1>}/>
	  <Route path='/about' render={()=> <h1>About</h1>}/>
	  <Route path='/contact' render={()=> <h1>Contact</h1>}/>
	 </div> 
   </Router>
);

export default App1;



//  const Home=()=><h1>Home</h1>

//  <Route exact path='/' component={Home}/>
//  <Route strict path='/about/' component={Home}/>
//  <Route path='/about' render={()=> <h1>About</h1>}/>
//  <Route path='/about' children={()=> <h1>About</h1>}/>    in root will be Home and About
//  <Route path='/about' children={({match})=>match && <h1>About</h1>}/>


