import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./splash.css";

export default function SplashScreen() {
    const { default: logoSvg } = require("../../assets/logo.svg") as { default: string };

    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            navigate("/landing");
        }, Math.floor(Math.random() * 4500) + 500);
    })
    
    return (
        <div className="splashScreen">
            <img src={logoSvg} alt="Logo" />
        </div>
    )
}