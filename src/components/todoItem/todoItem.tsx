import { TodoCategory } from "./todoCategory";
import { TodoPriority } from "./todoPriority";
import { TodoState } from "./todoState";
import ProgressBar from "../progressBar/progressBar";
import UserIcon from "../userIcon/userIcon";
import Todo from "../../classes/todo/todo";

import "./todoItem.css";

export default function TodoItem({todo}: {todo: Todo}) {
    const title = todo.getTitle();
    const category = todo.getCategory();
    const priority = todo.getPriority();
    const progress = todo.getProgress();
    const startDate = todo.getStartDate();
    const goalDate = todo.getGoalDate();
    const state = todo.getState()

    const { default: startIconSvg } = require("../../assets/calendar.svg") as { default: string };
    const { default: goalIconSvg } = require("../../assets/flag.svg") as { default: string };
    const { default: moreIconSvg } = require("../../assets/dots.svg") as { default: string };
    const { default: addIconSvg } = require("../../assets/plus.svg") as { default: string };

    function getCategoryName() {
        switch (category) {
            case TodoCategory.Design:
                return ( <h3 className="categoryDesign">Design</h3> );
            case TodoCategory.Code:
                return ( <h3 className="categoryCode">Code</h3> );
            case TodoCategory.Test:
                return ( <h3 className="categoryTest">Test</h3> );
            case TodoCategory.Implement:
                return ( <h3 className="categoryImplement">Implement</h3> );
            case TodoCategory.Refactor:
                return ( <h3 className="categoryRefactor">Refactor</h3> );
        }
    }

    function getStateName() {
        switch (state) {
            case TodoState.Completed:
                return ( <h3 className="todoState">Completed</h3> );
            case TodoState.InProgress:
                return ( <h3 className="todoState">Progress</h3> );
            case TodoState.NotStarted:
                return ( <h3 className="todoState">Not Started</h3> );
        }
    }

    function getMonth(month: number) {
        switch (month) {
            case 0:
                return "Jan";
            case 1:
                return "Feb";
            case 2:
                return "Mar";
            case 3:
                return "Apr";
            case 4:
                return "May";
            case 5:
                return "Jun";
            case 6:
                return "Jul";
            case 7:
                return "Aug";
            case 8:
                return "Sep";
            case 9:
                return "Oct";
            case 10:
                return "Nov";
            case 11:
                return "Dec";
        }
    }

    function getDateFormatted(date: Date) {
        return date.getDate() + " " + getMonth(date.getMonth()) + " " + date.getFullYear();
    }

    function getPriorityName() {
        switch (priority) {
            case TodoPriority.Low:
                return "Low";
            case TodoPriority.Medium:
                return "Medium";
            case TodoPriority.High:
                return "High";
            case TodoPriority.Top:
                return "Top";
        }
    }

    return (
        <div className="todoItem">
            <div className="todoItemMain">
                {getCategoryName()}
                <h1 className="todoTitle">{title}</h1>
                {getStateName()}
                <ProgressBar progress={progress} />
                <div className="dates">
                    <div className="date">
                        <img className="dateIcon" src={startIconSvg} alt="Start date" />
                        <p className="dateTitle">{getDateFormatted(startDate)}</p>
                    </div>
                    <div className="date">
                        <img className="dateIcon" src={goalIconSvg} alt="Goal date" />
                        <p className="dateTitle">{getDateFormatted(goalDate)}</p>
                    </div>
                </div>
                <div className="assignedUsers">
                    <UserIcon src="jan" />
                    <UserIcon src="piet" />
                    <UserIcon src="mia" />
                    <UserIcon src="kees" />
                    <button className="addAssignedUser"><img src={addIconSvg} alt="Add assigned user" /></button>
                </div>
            </div>
            <div className="todoItemSide">
                <button className="todoMore">
                    <img className="todoMoreIcon" src={moreIconSvg} alt="More" />
                </button>
                <div className={"todoPriorityWrapper "+getPriorityName()}>
                    <p className="todoPriority">{getPriorityName()}</p>
                </div>
            </div>
        </div>
    );
}