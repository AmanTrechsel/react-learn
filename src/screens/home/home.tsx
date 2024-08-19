import TaskItem from "../../components/taskItem/taskItem";
import { TaskCategory } from "../../components/taskItem/taskCategory";
import { TaskPriority } from "../../components/taskItem/taskPriority";
import { TaskState } from "../../components/taskItem/taskState";
import SearchBar from "../../components/searchBar/searchBar";
import Filter from "../../components/filter/filter";
import Task from "../../classes/task/task";
import NavigationButton from "../../components/navigationButton/navigationButton";
import { useState, useEffect, useContext, useRef, useReducer } from "react";
import { CurrentUserContext } from "../../contexts/currentUser/currentUserContext";

import "./home.css"
import { useNavigate } from "react-router-dom";
import { TaskItemsContext } from "../../contexts/taskItems/taskItemsContext";

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

    const [taskFilters, setTaskFilters] = useState<TaskState[]>([]);
    const [taskElements, setTaskElements] = useState<JSX.Element[]>([]);
    const [searchResults, setSearchResults] = useState<Task[]>([]);
    const [selectedResult, setSelectedResult] = useState<Task>();
    const [editingTask, setEditingTask] = useState<Task>();

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const { tasks, setTasks } = useContext(TaskItemsContext);

    const navigate = useNavigate();

    const burgerMenu = useRef<any>();
    const overlay = useRef<any>();
    const createTaskPanel = useRef<any>();

    const profilePicture = require("../../assets/users/" + (currentUser ? currentUser.getPicture() : "default") + ".jpg");

    const categories = Object.keys(TaskCategory).filter((v) => isNaN(Number(v)));
    const priorities = Object.keys(TaskPriority).filter((v) => isNaN(Number(v)));

    const categoryOptions = categories.map((category, index) => (
        <option key={"categoryOption" + index} className="createTaskInput" value={index}>{category}</option>
    ));

    const priorityOptions = priorities.map((priority, index) => (
        <option key={"priorityOption" + index} className="createTaskInput" value={index}>{priority}</option>
    ));

    function reducer(state: any, action: any) {
        switch (action.type) {
            case "changeTitle": {
                return {
                    title: action.title,
                    category: state.category,
                    priority: state.priority,
                    startDate: state.startDate,
                    endDate: state.endDate
                };
            }
            case "changeCategory": {
                return {
                    title: state.title,
                    category: action.category,
                    priority: state.priority,
                    startDate: state.startDate,
                    endDate: state.endDate
                };
            }
            case "changePriority": {
                return {
                    title: state.title,
                    category: state.category,
                    priority: action.priority,
                    startDate: state.startDate,
                    endDate: state.endDate
                };
            }
            case "changeStartDate": {
                return {
                    title: state.title,
                    category: state.category,
                    priority: state.priority,
                    startDate: action.startDate,
                    endDate: state.endDate
                };
            }
            case "changeEndDate": {
                return {
                    title: state.title,
                    category: state.category,
                    priority: state.priority,
                    startDate: state.startDate,
                    endDate: action.endDate
                };
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        title: "",
        category: TaskCategory.Design,
        priority: TaskPriority.Medium, 
        startDate: new Date(),
        endDate: new Date()
    });

    function updateTaskElements() {
        if (selectedResult) {
            setTaskElements([(<TaskItem key={"TaskItem0"} task={selectedResult} editFunction={startEditTask} deleteFunction={deleteTask} />)]);
        }
        else if (searchResults.length > 0) {
            setTaskElements(searchResults.map((taskItem, index) => (
                <TaskItem key={"TaskItem" + index} task={taskItem} editFunction={startEditTask} deleteFunction={deleteTask} />
            )));
        }
        else if (taskFilters.length === 0) {
            setTaskElements(tasks.map((taskItem: Task, index: string) => (
                <TaskItem key={"TaskItem" + index} task={taskItem} editFunction={startEditTask} deleteFunction={deleteTask} />
            )));
        }
        else {
            setTaskElements(tasks.filter((state: { getState: () => TaskState; }) => taskFilters.indexOf(state.getState()) != -1).map((taskItem: Task, index: string) => (
                <TaskItem key={"TaskItem" + index} task={taskItem} editFunction={startEditTask} deleteFunction={deleteTask} />
            )));
        }
    }

    function updateFilter(toggled: boolean, stateFilter: TaskState) {
        let temporaryFilters: TaskState[] = taskFilters;
        if (toggled) {
            temporaryFilters.push(stateFilter);
            setTaskFilters(temporaryFilters);
        }
        else {
            let valueIndex = taskFilters.indexOf(stateFilter);
            if (valueIndex != -1) {
                temporaryFilters.splice(valueIndex, 1);
                setTaskFilters(temporaryFilters);
            }
        }
        updateTaskElements();
    }

    function updateSearchResults(searchText: string, resultIndices: number[]) {
        if (searchText.length <= 0) {
            setSearchResults([]);
        }
        else {
            setSearchResults(resultIndices.map((value) => (tasks[value])));
        }
        setSelectedResult(undefined);
        updateTaskElements();
    }

    function updateSelectedResult(task?: Task) {
        setSelectedResult(task);
        updateTaskElements();
    }

    function toggleBurgerMenu() {
        if (burgerMenu.current) {
            burgerMenu.current.classList.toggle("show");
        }
        if (overlay.current) {
            overlay.current.classList.toggle("show");
        }
    }

    function signOut() {
        navigate("/sign-in");
        setCurrentUser(null);
    }

    function toggleCreateTask() {
        if (createTaskPanel.current) {
            createTaskPanel.current.classList.toggle("show");
        }
    }

    function formatDate(date: Date): string {
        let monthNum = date.getMonth() + 1;
        let monthFormatted = monthNum <= 9 ? "0" + monthNum.toString() : monthNum.toString(); 
        let dateNum = date.getDate();
        let dateFormatted = dateNum <= 9 ? "0" + dateNum.toString() : dateNum.toString();
        let value = date.getFullYear() + "-" + monthFormatted + "-" + dateFormatted;
        return value;
    }

    function createTask() {
        let newTasks = tasks;
        newTasks.push(new Task(tasks.length, state?.title, state?.category, state?.priority, state?.endDate, state?.startDate))
        setTasks(newTasks);
        resetDispatch();
        updateTaskElements();
        toggleCreateTask();
    }

    function deleteTask(task: Task) {
        let newTasks = tasks;
        let currentTaskIndex = newTasks.indexOf(task);
        newTasks.splice(currentTaskIndex, 1);
        setTasks(newTasks);
        updateTaskElements();
    }

    function startEditTask(task: Task) {
        setEditingTask(task);
        dispatch({ type: 'changeTitle', title: task.getTitle()});
        dispatch({ type: 'changeCategory', category: task.getCategory()});
        dispatch({ type: 'changePriority', priority: task.getPriority()});
        dispatch({ type: 'changeStartDate', startDate: task.getStartDate()});
        dispatch({ type: 'changeEndDate', endDate: task.getGoalDate()});
        toggleCreateTask();
    }

    function editTask() {
        if (editingTask) {
            resetDispatch();
            let newTasks = tasks;
            let currentTaskIndex = newTasks.indexOf(editingTask);
            newTasks[currentTaskIndex] = new Task(editingTask.getId(), state?.title, state?.category, state?.priority, state?.endDate, state?.startDate, editingTask.getProgress());
            setTasks(newTasks);
            updateTaskElements();
            toggleCreateTask();
            setEditingTask(undefined);
        }
    }

    function resetDispatch() {
        dispatch({ type: 'changeTitle', title: ""});
        dispatch({ type: 'changeCategory', category: TaskCategory.Design});
        dispatch({ type: 'changePriority', priority: TaskPriority.Medium});
        dispatch({ type: 'changeStartDate', startDate: new Date()});
        dispatch({ type: 'changeEndDate', endDate: new Date()});
    }

    function getCreateTaskButton() {
        if (editingTask) {
            return (<button className="createTaskButton" onClick={editTask}>Edit</button>)
        }
        else {
            return (<button className="createTaskButton" onClick={createTask}>Create</button>)
        }
    }

    useEffect(() => {
        if (currentUser) {
            updateTaskElements();
        }
        else {
            navigate("/sign-in")
        }
    }, [taskFilters, searchResults, selectedResult, currentUser]);

    return (
        <div className="homeScreen">
            <div className="homeContentWrapper">
                <div ref={burgerMenu} className="homeBurgerMenu">
                    <div className="homeHeaderMain">
                        <button className="burgerMenu" onClick={toggleBurgerMenu}>
                            <img src={burgerSvg} alt="Burger menu" />
                        </button>
                        <div className="homeHello">
                            <img src={profilePicture} alt="profilePicture" />
                            <div className="homeHelloText">
                                <p>How are you?</p>
                                <h2>{currentUser ? currentUser.getFullName() : "Username"}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="homeBurgerContent">
                        <div className="homeBurgerButtons">
                            <button className="homeBurgerButton" onClick={() => navigate("/home")}>Home</button>
                            <button className="homeBurgerButton" onClick={() => { toggleBurgerMenu(); toggleCreateTask(); }}>Create new task</button>
                            <button className="homeBurgerButton" onClick={() => navigate("/account")}>Account</button>
                            <button className="homeBurgerButton" onClick={() => navigate("/calendar")}>Calendar</button>
                            <button className="homeBurgerButton" onClick={() => navigate("/statistics")}>Statistics</button>
                        </div>
                        <button className="homeBurgerButton signout" onClick={signOut}>Sign Out</button>
                        <p className="version">version 0.0.1</p>
                    </div>
                </div>
                <div ref={overlay} className="homeOverlay"></div>
                <div className="homeContent">
                    <div className="homeHeader">
                        <div className="homeHeaderMain">
                            <div className="homeHello">
                                <img src={profilePicture} alt="profilePicture" />
                                <div className="homeHelloText">
                                    <p>Hello</p>
                                    <h2>{currentUser ? currentUser.getFirstName() : "Username"}</h2>
                                </div>
                            </div>
                            <button className="burgerMenu" onClick={toggleBurgerMenu}>
                                <img src={burgerSvg} alt="Burger menu" />
                            </button>
                        </div>
                        <SearchBar onChange={updateSearchResults} onSearchResult={updateSelectedResult} />
                        <h1 className="homeTaskTitle">Your Task</h1>
                        <div className="homeFilters">
                            <Filter title="In Progress" stateFilter={TaskState.InProgress} onChange={updateFilter} />
                            <Filter title="To Do" stateFilter={TaskState.NotStarted} onChange={updateFilter} />
                            <Filter title="Completed" stateFilter={TaskState.Completed} onChange={updateFilter} />
                        </div>
                    </div>
                    <div className="taskItems">
                        {taskElements}
                    </div>
                    <div ref={createTaskPanel} className="createTask">
                        <div className="taskInput">
                            <label className="taskLabel" htmlFor="createTaskName">Task name</label>
                            <input className="createTaskInput" id="createTaskName" value={state?.title} onChange={(event) => dispatch({ type: 'changeTitle', title: event.target.value})} type="text" placeholder="Enter a task name..." />
                        </div>
                        <div className="taskInput">
                            <label className="taskLabel" htmlFor="createTaskCategory">Category</label>
                            <select className="createTaskInput" id="createTaskCategory" value={Number(state?.category)} onChange={(event) => dispatch({ type: 'changeCategory', category: Number(event.target.value) as TaskCategory})}>
                                {categoryOptions}
                            </select>
                        </div>
                        <div className="taskInput">
                            <label className="taskLabel" htmlFor="createTaskPriority">Priority</label>
                            <select className="createTaskInput" id="createTaskPriority" value={Number(state?.priority)} onChange={(event) => dispatch({ type: 'changePriority', priority: Number(event.target.value) as TaskPriority})}>
                                {priorityOptions}
                            </select>
                        </div>
                        <div className="groupedTaskInput">
                            <div className="taskInput">
                                <label className="taskLabel" htmlFor="createTaskStart">Start date</label>
                                <input className="createTaskInput" id="createTaskStart" value={formatDate(state?.startDate)} type="date" onChange={(event) => dispatch({ type: 'changeStartDate', startDate: new Date(event.target.value)})} />
                            </div>
                            <div className="taskInput">
                                <label className="taskLabel" htmlFor="createTaskGoal">Goal date</label>
                                <input className="createTaskInput" id="createTaskGoal" value={formatDate(state?.endDate)} type="date" onChange={(event) => dispatch({ type: 'changeEndDate', endDate: new Date(event.target.value)})} />
                            </div>
                        </div>
                        {getCreateTaskButton()}
                    </div>
                    <div className="homeFooter">
                        <NavigationButton src={homeSvg} selectedSrc={homeSelectedSvg} selected={true} onClick={() => navigate("/home")} />
                        <NavigationButton src={calendarSvg} selectedSrc={calendarSelectedSvg} onClick={() => navigate("/calendar")} />
                        <button className="addTaskItem" onClick={toggleCreateTask}><img src={addIconSvg} alt="Add task item" /></button>
                        <NavigationButton src={statisticsSvg} selectedSrc={statisticsSelectedSvg} onClick={() => navigate("/statistics")} />
                        <NavigationButton src={accountSvg} selectedSrc={accountSelectedSvg} onClick={() => navigate("/account")} />
                    </div>
                </div>
            </div>
        </div>
    );
}