import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Signup.css"


function SignUp() {




  
  return (
    
    <div className="signupWrapper">
      <h2 className="click">Click to sign up</h2>

      <NavLink style={{ textDecoration: 'none' }} to="/RegistrationForm">
  <p className="signupP">SIGN UP</p>
</NavLink>
      
    </div>
  );
}

export default SignUp;
