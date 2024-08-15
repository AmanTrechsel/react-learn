import TodoItem from "../../components/todoItem/todoItem";
import { TodoCategory } from "../../components/todoItem/todoCategory";
import { TodoPriority } from "../../components/todoItem/todoPriority";
import { TodoState } from "../../components/todoItem/todoState";
import SearchBar from "../../components/searchBar/searchBar";
import Filter from "../../components/filter/filter";
import NavigationButton from "../../components/navigationButton/navigationButton";
import { useState, useEffect } from "react";

import Todo from "../../classes/todo/todo";

import "./home.css"

export default function HomeScreen() {
    const { default: homeSvg } = require("../../assets/home.svg") as { default: string };
    const { default: calendarSvg } = require("../../assets/calendar2.svg") as { default: string };
    const { default: statisticsSvg } = require("../../assets/statistics.svg") as { default: string };
    const { default: accountSvg } = require("../../assets/account.svg") as { default: string };
    
    const { default: homeSelectedSvg } = require("../../assets/homeSelected.svg") as { default: string };
    const { default: calendarSelectedSvg } = require("../../assets/calendar2Selected.svg") as { default: string };
    const { default: statisticsSelectedSvg } = require("../../assets/statisticsSelected.svg") as { default: string };
    const { default: accountSelectedSvg } = require("../../assets/accountSelected.svg") as { default: string };

    const { default: burgerSvg } = require("../../assets/hamburger.svg") as { default: string };
    const { default: addIconSvg } = require("../../assets/plus.svg") as { default: string };
    const profilePicture = require("../../assets/users/sarthak.jpg");

    const todos = [
        new Todo("Layout of landing page", TodoCategory.Design, TodoPriority.Low, new Date(), new Date("2020-04-18"), 50),
        new Todo("Payment system with PayPal", TodoCategory.Code, TodoPriority.Medium, new Date("2026-07-12"), new Date("2023-11-09"), 60),
        new Todo("Payment system with Creditcard", TodoCategory.Test, TodoPriority.High, new Date("2003-08-05"), new Date("2001-12-31"), 25),
        new Todo("Backwards compatability with API version 1", TodoCategory.Implement, TodoPriority.Top, new Date("2014-02-26"), new Date("2014-01-22"), 100),
        new Todo("Splash screen load times", TodoCategory.Refactor, TodoPriority.Medium, new Date("2000-06-12"), new Date("1999-05-04"))
    ];

    const [todoFilters, setTodoFilters] = useState<TodoState[]>([]);
    const [todoElements, setTodoElements] = useState<JSX.Element[]>([]);
    const [searchResults, setSearchResults] = useState<Todo[]>([]);
    const [selectedResult, setSelectedResult] = useState<Todo>();

    function updateTodoElements() {
        if (selectedResult) {
            setTodoElements([(<TodoItem key={"TodoItem0"} todo={selectedResult} />)]);
        }
        else if (searchResults.length > 0) {
            setTodoElements(searchResults.map((todoItem, index) => (
                <TodoItem key={"TodoItem" + index} todo={todoItem} />
            )));
        }
        else if (todoFilters.length === 0) {
            setTodoElements(todos.map((todoItem, index) => (
                <TodoItem key={"TodoItem" + index} todo={todoItem} />
            )));
        }
        else {
            setTodoElements(todos.filter((state) => todoFilters.indexOf(state.getState()) != -1).map((todoItem, index) => (
                <TodoItem key={"TodoItem" + index} todo={todoItem} />
            )));
        }
    }

    function updateFilter(toggled: boolean, stateFilter: TodoState) {
        let temporaryFilters: TodoState[] = todoFilters;
        if (toggled) {
            temporaryFilters.push(stateFilter);
            setTodoFilters(temporaryFilters);
        }
        else {
            let valueIndex = todoFilters.indexOf(stateFilter);
            if (valueIndex != -1) {
                temporaryFilters.splice(valueIndex, 1);
                setTodoFilters(temporaryFilters);
            }
        }
        updateTodoElements();
    }

    function updateSearchResults(searchText: string, resultIndices: number[]) {
        if (searchText.length <= 0) {
            setSearchResults([]);
        }
        else {
            setSearchResults(resultIndices.map((value) => ( todos[value] )));
        }
        setSelectedResult(undefined);
        updateTodoElements();
    }

    function updateSelectedResult(todo?: Todo) {
        setSelectedResult(todo);
        updateTodoElements();
    }

    useEffect(() => {
        updateTodoElements();
    }, [todoFilters, searchResults, selectedResult]);

    return (
        <div className="homeScreen">
            <div className="homeContent">
                <div className="homeHeader">
                    <div className="homeHeaderMain">
                        <div className="homeHello">
                            <img src={profilePicture} alt="profilePicture" />
                            <div className="homeHelloText">
                                <p>Hello</p>
                                <h2>Sarthak</h2>
                            </div>
                        </div>
                        <button className="burgerMenu">
                            <img src={burgerSvg} alt="Burger menu" />
                        </button>
                    </div>
                    <SearchBar todos={todos} onChange={updateSearchResults} onSearchResult={updateSelectedResult} />
                    <h1 className="homeTaskTitle">Your Task</h1>
                    <div className="homeFilters">
                        <Filter title="In Progress" stateFilter={TodoState.InProgress} onChange={updateFilter} />
                        <Filter title="To Do" stateFilter={TodoState.NotStarted} onChange={updateFilter} />
                        <Filter title="Completed" stateFilter={TodoState.Completed} onChange={updateFilter} />
                    </div>
                </div>
                <div className="todoItems">
                    {todoElements}
                </div>
                <div className="homeFooter">
                    <NavigationButton src={homeSvg} selectedSrc={homeSelectedSvg} selected={true} />
                    <NavigationButton src={calendarSvg} selectedSrc={calendarSelectedSvg} />
                    <button className="addTodoItem"><img src={addIconSvg} alt="Add todo item" /></button>
                    <NavigationButton src={statisticsSvg} selectedSrc={statisticsSelectedSvg} />
                    <NavigationButton src={accountSvg} selectedSrc={accountSelectedSvg} />
                </div>
            </div>
        </div>
    );
}