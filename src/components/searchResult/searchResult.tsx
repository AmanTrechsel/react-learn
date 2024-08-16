import Todo from "../../classes/todo/todo";

import "./searchResult.css";

export default function SearchResult({todo, onClick}: {todo: Todo, onClick?: (todo: Todo) => void}) {
    function click() {
        if (onClick) {
            onClick(todo);
        }
    }

    return (
        <button className="searchResult" onClick={click}>
            {todo.getTitle()}
        </button>
    );
}