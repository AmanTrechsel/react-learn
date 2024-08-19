import { SetStateAction, useContext, useState } from "react";
import Todo from "../../classes/todo/todo";
import SearchResult from "../searchResult/searchResult";

import "./searchBar.css";
import { TodoItemsContext } from "../../contexts/todoItems/todoItemsContext";

export default function SearchBar({onChange, onSearchResult}: {onChange?: (value: string, results: number[]) => void, onSearchResult?: (result?: Todo) => void}) {
    const maxResults = 3;

    const { default: searchSvg } = require("../../assets/search.svg") as { default: string };
    const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);
    const [isFocused, setFocused] = useState<boolean>(false);
    
    const { tasks, setTasks } = useContext(TodoItemsContext);

    function checkSearchResult(checkA: string, checkB: string): boolean {
        var checkALowered = checkA.toLowerCase();
        var checkBLowered = checkB.toLowerCase();

        if (checkALowered.includes(checkBLowered) || checkBLowered.includes(checkALowered)) {
            return true;
        }

        var checkASplit: string[] = checkALowered.split(" ");
        var checkBSplit: string[] = checkBLowered.split(" ");

        checkASplit.forEach((wordA) => {
            if (checkBSplit.includes(wordA)) {
                return true;
            }
        })

        checkBSplit.forEach((wordB) => {
            if (checkASplit.includes(wordB)) {
                return true;
            }
        })

        return false;
    }

    function updateSearchResult(todo?: Todo) {
        if (onSearchResult) {
            onSearchResult(todo);
        }
    }

    function updateSearchResults(event: React.ChangeEvent<HTMLInputElement>) {
        var searchText: string = event.target.value;
        let tempSearchResults: JSX.Element[] = [];
        let resultIndices: number[] = [];
        let index = 0;
        for (let todoItem of tasks) {
            if (tempSearchResults.length >= maxResults) {
                break;
            }
            if (checkSearchResult(todoItem.getTitle(), searchText)) {
                tempSearchResults.push((<SearchResult key={"SearchResult" + index} todo={todoItem} onClick={updateSearchResult} />));
                resultIndices.push(index);
            }
            index++;
        }
        setSearchResults(tempSearchResults);
        if (searchText.length <= 0) {
            resultIndices = [];
        }
        if (onChange) {
            onChange(searchText, resultIndices);
        }
    }

    function updateFocus(event: React.FocusEvent<HTMLInputElement>) {
        var focused = event.target === document.activeElement;
        if (focused) {
            setFocused(true);
            updateSearchResult(undefined);
        }
        else {
            setTimeout(() => {
                setFocused(false);
            }, 100)
        }
    }

    return (
        <div className="searchBarMain">
            <div className="searchBarWrapper">
                <img className="searchIcon" src={searchSvg} alt="Search icon" />
                <input className="searchBar" type="text" placeholder="Find your task here..." onChange={updateSearchResults} onFocus={updateFocus} onBlur={updateFocus} />
            </div>
            <div className="searchResults" style={{display: (isFocused ? "block" : "none")}}>
                {searchResults}
            </div>
        </div>
    );
}