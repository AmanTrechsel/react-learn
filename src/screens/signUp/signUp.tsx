import React from "react";
import Banner from "../../components/banner/banner";
import InputField from "../../components/inputField/inputField";
import CheckBox from "../../components/checkBox/checkBox";
import Button from "../../components/button/button";

import "./signUp.css";

const { default: googleSvg } = require("../../assets/google.svg") as { default: string };
const { default: facebookSvg } = require("../../assets/facebook.svg") as { default: string };

export default function SignUpScreen() {
  return (
    <div className="signUpScreen">
      <Banner text="Sign Up" url="/landing" />
      <div className="content">
        <InputField title="E-mail" placeholder="Enter your email" password={false} />
        <InputField title="Password" placeholder="Enter your password" password={true} />
        <InputField title="Retype-Password" placeholder="Retype your password" password={true} />
        <CheckBox title="I Agree terms and Conditions" />
        <div className="buttons">
          <Button title="Sign Up Now" />
          <h3>Or with</h3>
          <Button title="Signup with Facebook" img={facebookSvg}/>
          <Button title="Signup with Google" inverted={true} img={googleSvg}/>
        </div>
      </div>
      <p className="footerText">Already Have an account? <a href="./sign-in">SignIn</a></p>
    </div>
  );
}
