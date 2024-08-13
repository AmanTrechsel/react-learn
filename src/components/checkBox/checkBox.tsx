import { useState, useRef } from "react";

import "./checkBox.css";

export default function CheckBox({title}: {title: string}) {
    const checkbox = useRef<any>();

    function selectCheckbox() {
        checkbox.current.checked = !checkbox.current.checked;
    }

    return (
        <div className="checkBox">
            <input ref={checkbox} type="checkbox" />
            <button onClick={selectCheckbox}>{title}</button>
        </div>
    );
}