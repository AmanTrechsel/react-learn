import { useNavigate } from "react-router-dom";

import "./splash.css";

const { default: logoSvg } = require("../../assets/logo.svg") as { default: string };


export default function SplashScreen() {
    const navigate = useNavigate();
    
    setTimeout(() => {
        navigate("/landing");
    }, 5000);
    
    return (
        <div className="splashScreen">
            <img src={logoSvg} alt="Logo" />
        </div>
    )
}