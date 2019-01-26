import React from 'react';

import classes from './Spinner.css';

// const spinner = () => (
//     <div className={classes.Loader}>Loading...</div>
// );

const spinner=()=>{
    const el= <div className={classes.Loader}>Loading...</div>
  
   return  el
}

export default spinner;