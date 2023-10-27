import React from "react";
import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <h2>Click on register to be able to navigate through site.</h2>
      <NavLink to="/RegistrationForm">Register</NavLink>
    </div>
  );
}

export default SignUp;
