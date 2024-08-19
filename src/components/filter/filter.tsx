import { useRef, useState } from "react";
import { TaskState } from "../taskItem/taskState";

import "./filter.css";

export default function Filter({ title, stateFilter, onChange }: { title: string, stateFilter: TaskState, onChange?: ((toggled: boolean, filterState: TaskState) => void) }) {
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