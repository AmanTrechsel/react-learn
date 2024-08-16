import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/banner/banner";
import InputField from "../../components/inputField/inputField";
import CheckBox from "../../components/checkBox/checkBox";
import Button from "../../components/button/button";
import { CurrentUserContext } from "../../contexts/currentUser/currentUserContext";
import { UsersContext } from "../../contexts/users/usersContext";
import User from "../../classes/user/user";

import "./signUp.css";

const { default: googleSvg } = require("../../assets/google.svg") as { default: string };
const { default: facebookSvg } = require("../../assets/facebook.svg") as { default: string };

export default function SignUpScreen() {
  const { users, setUsers } = useContext(UsersContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    
  const navigate = useNavigate();

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "change_email": {
        return {
          email: action.changedEmail,
          password: state.password
        };
      }
      case "change_password": {
        return {
          email: state.email,
          password: action.changedPassword
        };
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });

  function signUp() {
    var new_users = users;
    var created_user = new User("New", "User", state?.email, state?.password);
    new_users.push(created_user);
    setUsers(new_users);
    setCurrentUser(created_user);
    navigate("/home");
  }

  return (
    <div className="signUpScreen">
      <Banner text="Sign Up" url="/landing" />
      <div className="content">
        <InputField title="E-mail" placeholder="Enter your email" onChange={(value: string) => dispatch({ type: 'change_email', changedEmail: value })} />
        <InputField title="Password" placeholder="Enter your password" password={true} onChange={(value: string) => dispatch({ type: 'change_password', changedPassword: value })} />
        <InputField title="Retype-Password" placeholder="Retype your password" password={true} />
        <CheckBox title="I Agree terms and Conditions" />
        <div className="buttons">
          <Button title="Sign Up Now" onClick={signUp} />
          <h3>Or with</h3>
          <Button title="Signup with Facebook" img={facebookSvg}/>
          <Button title="Signup with Google" inverted={true} img={googleSvg}/>
        </div>
      </div>
      <p className="footerText">Already Have an account? <a href="./sign-in">SignIn</a></p>
    </div>
  );
}
