import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/banner/banner";
import InputField from "../../components/inputField/inputField";
import CheckBox from "../../components/checkBox/checkBox";
import Button from "../../components/button/button";
import { CurrentUserContext } from "../../contexts/currentUser/currentUserContext";
import { UpdaterContext } from "../../contexts/updater/updaterContext";
import User from "../../classes/user/user";
import Updater from "../../classes/updater/updater";

import "./signUp.css";

export default function SignUpScreen() {
  const { default: googleSvg } = require("../../assets/google.svg") as { default: string };
  const { default: facebookSvg } = require("../../assets/facebook.svg") as { default: string };

  const { updater, setUpdater } = useContext(UpdaterContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    
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

  function signUp() {
    var createdUser = new User("New", "User", state?.email, state?.password);
    updater.appendUser(updater, createdUser);
    setCurrentUser(createdUser);
    navigate("/home");
  }

  return (
    <div className="signUpScreen">
      <Banner text="Sign Up" url="/landing" />
      <form className="content">
        <InputField title="E-mail" placeholder="Enter your email" onChange={(value: string) => dispatch({ type: 'changeEmail', changedEmail: value })} />
        <InputField title="Password" placeholder="Enter your password" password={true} onChange={(value: string) => dispatch({ type: 'changePassword', changedPassword: value })} />
        <InputField title="Retype-Password" placeholder="Retype your password" password={true} />
        <CheckBox title="I Agree terms and Conditions" />
        <div className="buttons">
          <Button title="Sign Up Now" onClick={signUp} submit={true} />
          <h3>Or with</h3>
          <Button title="Signup with Facebook" img={facebookSvg}/>
          <Button title="Signup with Google" inverted={true} img={googleSvg}/>
        </div>
      </form>
      <p className="footerText">Already Have an account? <a href="./sign-in">SignIn</a></p>
    </div>
  );
}
