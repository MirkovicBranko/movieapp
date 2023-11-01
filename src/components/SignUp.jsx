import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Signup.css"
import FramerMotion from "./FramerMotion";

function SignUp() {




  
  return (
    
    <div className="signupWrapper">
      <h2 className="click">Click to sign up</h2>

      <FramerMotion/><NavLink style={{ textDecoration: 'none' }} to="/RegistrationForm">
  <p className="signupP">SIGN UP</p>
</NavLink>
      
    </div>
  );
}

export default SignUp;
