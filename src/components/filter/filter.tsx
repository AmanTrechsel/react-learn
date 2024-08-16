import { useRef, useState } from "react";
import { TodoState } from "../todoItem/todoState";

import "./filter.css";

export default function Filter({ title, stateFilter, onChange }: { title: string, stateFilter: TodoState, onChange?: ((toggled: boolean, filterState: TodoState) => void) }) {
    const filterButton = useRef<any>();
    const [isToggled, setIsToggled] = useState<boolean>(false);

    function toggleSelected() {
        if (filterButton.current) {
            filterButton.current.classList.toggle("selected");
            setIsToggled(!isToggled);
            if (onChange) {
                onChange(!isToggled, stateFilter);
            }
        }
    }

    return (
        <button ref={filterButton} className="filter" onClick={toggleSelected}>{title}</button>
    );
}