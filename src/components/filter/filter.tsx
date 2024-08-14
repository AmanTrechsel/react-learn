import { useRef } from "react";

import "./filter.css";

export default function Filter({ title }: { title: string }) {
    const filterButton = useRef<any>();

    function toggleSelected() {
        if (filterButton.current) {
            filterButton.current.classList.toggle("selected");
        }
    }

    return (
        <button ref={filterButton} className="filter" onClick={toggleSelected}>{title}</button>
    );
}