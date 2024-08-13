import "./splash.css";

const { default: logoSvg } = require("../assets/logo.svg") as { default: string };

export default function SplashScreen() {
    return (
        <div className="splashScreen">
            <img src={logoSvg} alt="Logo" />
        </div>
    )
}