import { useState, useRef } from "react";

import "./inputField.css";

const { default: visibilitySvg } = require("../../assets/visibility.svg") as { default: string };
const { default: visibilityOffSvg } = require("../../assets/visibilityOff.svg") as { default: string };

export default function InputField({ title, placeholder, password }: { title: string, placeholder: string, password: boolean }) {
    const [passwordShown, setPasswordShown] = useState(false);
    const inputField = useRef<any>();
    
    function changeVisibility() {
        if (inputField.current) {
            if (passwordShown) {
                inputField.current.setAttribute("type", "password");
            }
            else {
                inputField.current.setAttribute("type", "text");
            }
            setPasswordShown(!passwordShown);
        }
    }

    function getVisibilityIcon() {
        if (passwordShown) {
            return (<img src={visibilitySvg} alt="Visibility button shown" />);
        }
        else {
            return (<img src={visibilityOffSvg} alt="Visibility button hidden" />);
        }
    }

    function getInputWrapper() {
        if (password) {
            return (
                <div className="inputFieldWrapper">
                    <input ref={inputField} className="inputFieldTextWithButton" id="inputFieldText" type="password" placeholder={placeholder} />
                    <button className="passwordButton" onClick={changeVisibility}>
                        {getVisibilityIcon()}
                    </button>
                </div>
            );
        }
        else {
            return (
                <div className="inputFieldWrapper">
                    <input id="inputFieldText" type="text" placeholder={placeholder} />
                </div>
            );
        }
    }
    
    return (
        <div className="inputField">
            <label htmlFor="inputFieldText">{title}</label>
            {getInputWrapper()}
        </div>
    );
}