import { TodoCategory } from "./todoCategory";
import { TodoPriority } from "./todoPriority";
import { TodoState } from "./todoState";
import ProgressBar from "../progressBar/progressBar";
import UserIcon from "../userIcon/userIcon";
import Todo from "../../classes/todo/todo";
import User from "../../classes/user/user";
import Button from "../button/button";

import "./todoItem.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UsersContext } from "../../contexts/users/usersContext";

export default function TodoItem({todo, editFunction, deleteFunction}: {todo: Todo, editFunction: (task: Todo) => void, deleteFunction: (task: Todo) => void}) {
    const title = todo.getTitle();
    const category = todo.getCategory();
    const priority = todo.getPriority();
    const progress = todo.getProgress();
    const startDate = todo.getStartDate();
    const goalDate = todo.getGoalDate();
    const state = todo.getState()

    const { users, setUsers } = useContext(UsersContext);

    const [assignedUsers, setAssignedUsers] = useState<any>();
    const [nonAssignedUsersButtons, setNonAssignedUsersButtons] = useState<any>();

    const addAssignedUsersDropdown = useRef<any>();
    const addAssignedUserButton = useRef<any>();
    const moreDropdown = useRef<any>();

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

    function updateAssignedUsers() {
        let filteredUsers = users.filter((user: User) => user.hasTask(todo.getId()));
        setAssignedUsers(filteredUsers.map((user: User, index: string) => (
                <UserIcon key={"UserIcon" + index} user={user} />
            )
        ));
    }

    function updateNonAssigned() {
        let nonAssigned = users.filter((user: User) => !user.hasTask(todo.getId()));
        setNonAssignedUsersButtons(nonAssigned.map((user: User, index: string) => (
            <button key={"nonAssignedUserButton" + index} className="nonAssignedUser" onClick={() => addAssignedUser(user)}>{user.getFullName()}</button>
        )));
    }

    function toggleAddAssigned() {
        if (addAssignedUsersDropdown.current) {
            addAssignedUsersDropdown.current.classList.toggle("open");
        }
    }

    function addAssignedUser(user: User) {
        addAssignedUsersDropdown.current.classList.remove("open");
        user.appendTask(todo.getId());
        updateNonAssigned();
        updateAssignedUsers();
        if (addAssignedUsersDropdown.current.children.length <= 1) {
            addAssignedUserButton.current.style.display = "none";
        }
    }

    function toggleMore() {
        if (moreDropdown.current) {
            moreDropdown.current.classList.toggle("open");
        }
    }

    useEffect(() => {
        updateAssignedUsers();
        updateNonAssigned();
    }, [users, todo, setAssignedUsers, setNonAssignedUsersButtons]);

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
                    {assignedUsers}
                    <button ref={addAssignedUserButton} className="addAssignedUser" onClick={toggleAddAssigned}><img src={addIconSvg} alt="Add assigned user" /></button>
                    <div ref={addAssignedUsersDropdown} className="assignedUsersDropdown">
                        {nonAssignedUsersButtons}
                    </div>
                </div>
            </div>
            <div className="todoItemSide">
                <button className="todoMore" onClick={toggleMore}>
                    <img className="todoMoreIcon" src={moreIconSvg} alt="More" />
                </button>
                <div ref={moreDropdown} className="todoMoreDropdown">
                    <button className="moreButton" onClick={() => editFunction(todo)}>Edit</button>
                    <button className="moreButton delete" onClick={() => deleteFunction(todo)}>Delete</button>
                </div>
                <div className={"todoPriorityWrapper "+getPriorityName()}>
                    <p className="todoPriority">{getPriorityName()}</p>
                </div>
            </div>
        </div>
    );
}