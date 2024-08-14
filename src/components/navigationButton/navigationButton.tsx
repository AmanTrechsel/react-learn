import { useState } from "react";

import "./navigationButton.css"

export default function NavigationButton({src, selectedSrc, selected}: {src: string, selectedSrc?: string, selected?: boolean}) {
    const [isSelected, setSelected] = useState(selected);
    
    function toggleSelected() {
        setSelected(!isSelected);
    }
    
    return (
        <button className="navigationButton" onClick={toggleSelected}>
            <img src={isSelected ? selectedSrc : src} />
        </button>
    )
}