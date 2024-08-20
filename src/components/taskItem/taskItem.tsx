import { useContext, useEffect, useRef, useState } from "react";
import { UpdaterContext } from "../../contexts/updater/updaterContext";
import { TaskCategory } from "./taskCategory";
import { TaskPriority } from "./taskPriority";
import { TaskState } from "./taskState";
import ProgressBar from "../progressBar/progressBar";
import UserIcon from "../userIcon/userIcon";
import Task from "../../classes/task/task";
import User from "../../classes/user/user";

import "./taskItem.css";

export default function TaskItem({ task, editFunction, deleteFunction }: { task: Task, editFunction: (task: Task) => void, deleteFunction: (task: Task) => void }) {
    const title = task.getTitle();
    const category = task.getCategory();
    const priority = task.getPriority();
    const progress = task.getProgress();
    const startDate = task.getStartDate();
    const goalDate = task.getGoalDate();
    const state = task.getState()

    const { updater, setUpdater } = useContext(UpdaterContext);

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
            case TaskCategory.Design:
                return (<h3 className="categoryDesign">Design</h3>);
            case TaskCategory.Code:
                return (<h3 className="categoryCode">Code</h3>);
            case TaskCategory.Test:
                return (<h3 className="categoryTest">Test</h3>);
            case TaskCategory.Implement:
                return (<h3 className="categoryImplement">Implement</h3>);
            case TaskCategory.Refactor:
                return (<h3 className="categoryRefactor">Refactor</h3>);
        }
    }

    function getStateName() {
        switch (state) {
            case TaskState.Completed:
                return (<h3 className="taskState">Completed</h3>);
            case TaskState.InProgress:
                return (<h3 className="taskState">Progress</h3>);
            case TaskState.NotStarted:
                return (<h3 className="taskState">Not Started</h3>);
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
            case TaskPriority.Low:
                return "Low";
            case TaskPriority.Medium:
                return "Medium";
            case TaskPriority.High:
                return "High";
            case TaskPriority.Top:
                return "Top";
        }
    }

    async function updateAssignedUsers() {
        let filteredUsers = await updater.getUsers(updater).filter((user: User) => task.hasUser(user.getId()));
        setAssignedUsers(filteredUsers.map((user: User, index: string) => (
            <UserIcon key={"UserIcon" + index} user={user} />
        )
        ));
    }

    async function updateNonAssigned() {
        let nonAssigned = await updater.getUsers(updater).filter((user: User) => !task.hasUser(user.getId()));
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
        task.appendUser(user.getId());
        updater.updateTask(updater, task.getId(), task).then(() => {
            updateNonAssigned();
            updateAssignedUsers();
            if (addAssignedUsersDropdown.current.children.length <= 1) {
                addAssignedUserButton.current.style.display = "none";
            }
        })
    }

    function toggleMore() {
        if (moreDropdown.current) {
            moreDropdown.current.classList.toggle("open");
        }
    }

    useEffect(() => {
        updateAssignedUsers();
        updateNonAssigned();
    }, [updater, task, setAssignedUsers, setNonAssignedUsersButtons]);

    return (
        <div className="taskItem">
            <div className="taskItemMain">
                {getCategoryName()}
                <h1 className="taskTitle">{title}</h1>
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
            <div className="taskItemSide">
                <button className="taskMore" onClick={toggleMore}>
                    <img className="taskMoreIcon" src={moreIconSvg} alt="More" />
                </button>
                <div ref={moreDropdown} className="taskMoreDropdown">
                    <button className="moreButton" onClick={() => editFunction(task)}>Edit</button>
                    <button className="moreButton delete" onClick={() => deleteFunction(task)}>Delete</button>
                </div>
                <div className={"taskPriorityWrapper " + getPriorityName()}>
                    <p className="taskPriority">{getPriorityName()}</p>
                </div>
            </div>
        </div>
    );
}