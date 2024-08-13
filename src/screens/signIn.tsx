import React from "react";
import Banner from "../components/banner/banner";
import InputField from "../components/inputField/inputField";
import CheckBox from "../components/checkBox/checkBox";
import Button from "../components/button/button";

import "./signIn.css";

const { default: googleSvg } = require("../assets/google.svg") as { default: string };
const { default: facebookSvg } = require("../assets/facebook.svg") as { default: string };

export default function SignInScreen() {
  return (
    <div className="signInScreen">
      <Banner text="Sign In" />
      <div className="content">
        <InputField title="E-mail" placeholder="Enter your email" password={false} />
        <InputField title="Password" placeholder="Enter your password" password={true} />
        <div className="passwordOptions">
          <CheckBox title="Remember Password" />
          <a>Forgot Password?</a>
        </div>
        <div className="buttons">
          <Button title="Sign In Now" />
          <h3>Or with</h3>
          <Button title="Login with Facebook" img={facebookSvg}/>
          <Button title="Login with Google" inverted={true} img={googleSvg}/>
        </div>
      </div>
      <p className="footerText">I don’t Have an account? <a href="./sign-up">Signup</a></p>
    </div>
  );
}
