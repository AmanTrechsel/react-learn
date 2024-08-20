import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/banner/banner";
import InputField from "../../components/inputField/inputField";
import CheckBox from "../../components/checkBox/checkBox";
import Button from "../../components/button/button";
import { CurrentUserContext } from "../../contexts/currentUser/currentUserContext";
import { UpdaterContext } from "../../contexts/updater/updaterContext";
import User from "../../classes/user/user";
import { openFacebook, openGoogle } from "../../utils/links";

import "./signUp.css";

export default function SignUpScreen() {
  const { default: googleSvg } = require("../../assets/google.svg") as { default: string };
  const { default: facebookSvg } = require("../../assets/facebook.svg") as { default: string };

  const { updater, setUpdater } = useContext(UpdaterContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    
  const navigate = useNavigate();

  const [errors, setErrors] = useState<any>([]);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "changeEmail": {
        return {
          email: action.changedEmail,
          firstname: state.firstname,
          lastname: state.lastname,
          password: state.password,
          passwordRetyped: state.passwordRetyped
        };
      }
      case "changeFirstName": {
        return {
          email: state.email,
          firstname: action.changedFirstName,
          lastname: state.lastname,
          password: state.password,
          passwordRetyped: state.passwordRetyped
        };
      }
      case "changeLastName": {
        return {
          email: state.email,
          firstname: state.firstname,
          lastname: action.changedLastName,
          password: state.password,
          passwordRetyped: state.passwordRetyped
        };
      }
      case "changePassword": {
        return {
          email: state.email,
          firstname: state.firstname,
          lastname: state.lastname,
          password: action.changedPassword,
          passwordRetyped: state.passwordRetyped
        };
      }
      case "changePasswordRetyped": {
        return {
          email: state.email,
          firstname: state.firstname,
          lastname: state.lastname,
          password: state.password,
          passwordRetyped: action.changedPasswordRetyped
        };
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, { email: "", firstname: "", lastname: "", password: "", passwordRetyped: "" });

  function signUp(event: any) {
    event.preventDefault();
    let errors = [];
    if (state?.firstname === undefined || state?.firstname === "") {
      errors.push("No first name was given.");
    }
    if (state?.lastname === undefined || state?.lastname === "") {
      errors.push("No last name was given.");
    }
    if (state?.email === undefined || state?.email === "") {
      errors.push("No e-mail was given.");
    }
    else if (!state?.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      errors.push("E-mail is invalid.");
    }
    if (state?.password === undefined || state?.password.length < 4) {
      errors.push("Your password has to be at least 4 characters.");
    }
    if (state?.password !== state?.passwordRetyped) {
      errors.push("Passwords do not match.");
    }
    if (errors.length === 0) {
      var createdUser = new User(updater.getUsers(updater).length, state?.firstname, state?.lastname, state?.email, state?.password);
      updater.appendUser(updater, createdUser).then(() => {
        setCurrentUser(createdUser);
        navigate("/home");
      });
    }
    setErrors(errors);
  }

  return (
    <div className="signUpScreen">
      <Banner text="Sign Up" url="/landing" />
      <form className="content" action="#">
        <InputField title="E-mail" placeholder="Enter your email" onChange={(value: string) => dispatch({ type: 'changeEmail', changedEmail: value })} />
        <div className="inputFieldGroup">
          <InputField title="First Name" placeholder="Enter your first name" onChange={(value: string) => dispatch({ type: 'changeFirstName', changedFirstName: value })} />
          <InputField title="Last Name" placeholder="Enter your last name" onChange={(value: string) => dispatch({ type: 'changeLastName', changedLastName: value })} />
        </div>
        <InputField title="Password" placeholder="Enter your password" password={true} onChange={(value: string) => dispatch({ type: 'changePassword', changedPassword: value })} />
        <InputField title="Retype-Password" placeholder="Retype your password" password={true} onChange={(value: string) => dispatch({ type: 'changePasswordRetyped', changedPasswordRetyped: value })} />
        <CheckBox title="I Agree terms and Conditions" />
        <div className="errors">
          {errors.map((error: string) => (
            <p className="error">{error}</p>
          ))}
        </div>
        <div className="buttons">
          <Button title="Sign Up Now" onClick={signUp} submit={true} />
          <h3>Or with</h3>
          <Button title="Signup with Facebook" img={facebookSvg} onClick={openFacebook} />
          <Button title="Signup with Google" inverted={true} img={googleSvg} onClick={openGoogle} />
        </div>
      </form>
      <p className="footerText">Already Have an account? <a href="./sign-in">SignIn</a></p>
    </div>
  );
}
