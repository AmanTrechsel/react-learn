import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/banner/banner";
import InputField from "../../components/inputField/inputField";
import CheckBox from "../../components/checkBox/checkBox";
import Button from "../../components/button/button";
import { CurrentUserContext } from "../../contexts/currentUser/currentUserContext";
import { UpdaterContext } from "../../contexts/updater/updaterContext";
import { openFacebook, openGoogle } from "../../utils/links";

import "./signIn.css";


export default function SignInScreen() {
  const { default: googleSvg } = require("../../assets/google.svg") as { default: string };
  const { default: facebookSvg } = require("../../assets/facebook.svg") as { default: string };

  const { updater, setUpdater } = useContext(UpdaterContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  
  const [error, setError] = useState<any>("");
  
  const navigate = useNavigate();

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "changeEmail": {
        return {
          email: action.changedEmail,
          password: state.password
        };
      }
      case "changePassword": {
        return {
          email: state.email,
          password: action.changedPassword
        };
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });

  function signIn(event: any) {
    event.preventDefault();
    setError("");
    for (let user of updater.getUsers(updater)) {
      if (user.validateLogin(state?.email, state?.password)) {
        setCurrentUser(user);
        navigate("/home");
        return;
      }
    };
    setError("Your e-mail or password is incorrect.");
  }

  return (
    <div className="signInScreen">
      <Banner text="Sign In" url="/landing" />
      <form className="content">
        <InputField title="E-mail" placeholder="Enter your email" password={false} onChange={(value: string) => dispatch({ type: 'changeEmail', changedEmail: value })} />
        <InputField title="Password" placeholder="Enter your password" password={true} onChange={(value: string) => dispatch({ type: 'changePassword', changedPassword: value })} />
        <div className="passwordOptions">
          <CheckBox title="Remember Password" />
          <a>Forgot Password?</a>
        </div>
        <div className="errors">
          <p className="error">{error}</p>
        </div>
        <div className="buttons">
          <Button title="Sign In Now" onClick={signIn} submit={true} />
          <h3>Or with</h3>
          <Button title="Login with Facebook" img={facebookSvg} onClick={openFacebook} />
          <Button title="Login with Google" inverted={true} img={googleSvg} onClick={openGoogle} />
        </div>
      </form>
      <p className="footerText">I don’t Have an account? <a href="./sign-up">Signup</a></p>
    </div>
  );
}
