import Banner from "../../components/banner/banner";
import Button from "../../components/button/button";
import openURL from "../../utils/openURL";

import "./landing.css";

export default function LandingScreen() {
    const { default: logoSvg } = require("../../assets/logo.svg") as { default: string };

    function signup() {
        openURL("/sign-up");
    }

    function signin() {
        openURL("/sign-in");
    }

    return (
        <div className="landingScreen">
            <div className="landingScreenBody">
                <Banner text="ToDoX" back={false} />
                <img src={logoSvg} alt="Logo" className="landingLogo" />
                <div className="landingButtons">
                    <Button title="Sign In" onClick={signin} />
                    <Button title="Sign Up" onClick={signup} inverted={true} />
                </div>
            </div>
        </div>
    )
}