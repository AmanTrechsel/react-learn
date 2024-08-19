import Task from "../../classes/task/task";

import "./searchResult.css";

export default function SearchResult({task, onClick}: {task: Task, onClick?: (task: Task) => void}) {
    function click() {
        if (onClick) {
            onClick(task);
        }
    }

    return (
        <button className="searchResult" onClick={click}>
            {task.getTitle()}
        </button>
    );
}