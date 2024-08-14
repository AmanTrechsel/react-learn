import TodoItem from "../../components/todoItem/todoItem";
import { TodoCategory } from "../../components/todoItem/todoCategory";
import { TodoPriority } from "../../components/todoItem/todoPriority";
import SearchBar from "../../components/searchBar/searchBar";
import Filter from "../../components/filter/filter";
import NavigationButton from "../../components/navigationButton/navigationButton";

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
                    <SearchBar />
                    <h1 className="homeTaskTitle">Your Task</h1>
                    <div className="homeFilters">
                        <Filter title="In Progress" />
                        <Filter title="To Do" />
                        <Filter title="Completed" />
                    </div>
                </div>
                <div className="todoItems">
                    <TodoItem title="Design" category={TodoCategory.Design} priority={TodoPriority.Low} progress={50} startDate={new Date("2020-04-18")} goalDate={new Date()} />
                    <TodoItem title="Code" category={TodoCategory.Code} priority={TodoPriority.Medium} progress={60} startDate={new Date("2023-11-09")} goalDate={new Date("2026-07-12")} />
                    <TodoItem title="Test" category={TodoCategory.Test} priority={TodoPriority.High} progress={25} startDate={new Date("2001-12-31")} goalDate={new Date("2003-08-05")} />
                    <TodoItem title="Implement" category={TodoCategory.Implement} priority={TodoPriority.Top} progress={100} startDate={new Date("2014-01-22")} goalDate={new Date("2014-02-26")} />
                    <TodoItem title="Refactor" category={TodoCategory.Refactor} priority={TodoPriority.Medium} progress={0} startDate={new Date("1999-05-04")} goalDate={new Date("2000-06-12")} />
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