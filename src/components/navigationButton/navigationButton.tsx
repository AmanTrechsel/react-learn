import { useState } from "react";

import "./navigationButton.css"

export default function NavigationButton({src, selectedSrc, selected, onClick = () => {}}: {src: string, selectedSrc?: string, selected?: boolean, onClick?: () => void}) {
    const [isSelected, setSelected] = useState(selected);
    
    return (
        <button className="navigationButton" onClick={onClick}>
            <img src={isSelected ? selectedSrc : src} />
        </button>
    )
}