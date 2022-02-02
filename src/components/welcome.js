import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function WelcomePage() {

    
  
    const names = localStorage.getItem('userName');
    
    return(
    <div>
      <Header name="Welcome Page" logout={true} names={names}/>
      {/* <h1 style={{textAlign:'center'}}>Welcome Page</h1> */}
      <h2 style={{textAlign:'center'}}>You Successfully logged In!!</h2>
      <h3 style={{textAlign:'center'}}>Welcome {names} </h3>
      <h4 style={{textAlign:'center'}}>Thank You For Log In  ❤️ </h4>
    
    
     <Footer/></div>);
}