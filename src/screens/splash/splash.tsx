import Route from "react-router-dom";
import openURL from "../../utils/openURL";

import "./splash.css";

const { default: logoSvg } = require("../../assets/logo.svg") as { default: string };


export default function SplashScreen() {
    setTimeout(() => {
        openURL("/landing");
    }, 5000);
    return (
        <div className="splashScreen">
            <img src={logoSvg} alt="Logo" />
        </div>
    )
}