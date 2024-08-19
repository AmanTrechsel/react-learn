import React, { useState } from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UsersContext } from "./contexts/users/usersContext";
import { CurrentUserContext } from "./contexts/currentUser/currentUserContext";
import User from "./classes/user/user";
import Task from "./classes/task/task";
import { TaskCategory } from "./components/taskItem/taskCategory";
import { TaskPriority } from "./components/taskItem/taskPriority";

import SignInScreen from "./screens/signIn/signIn";
import SignUpScreen from "./screens/signUp/signUp";
import SplashScreen from "./screens/splash/splash";
import LandingScreen from "./screens/landing/landing";

import HomeScreen from "./screens/home/home";
import CalendarScreen from "./screens/calendar/calendar";
import StatisticsScreen from "./screens/statistics/statistics";
import AccountScreen from "./screens/account/account";
import { TaskItemsContext } from "./contexts/taskItems/taskItemsContext";

import { getBooks } from "./utils/queries";
import { useQuery } from "@apollo/client";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>();

  const { loading, error, data } = useQuery(getBooks);

  console.log(data);

  const [users, setUsers] = useState<User[]>([
    new User("Sarthak", "Epic", "sarthak@mail.nl", "wachtwoord", "sarthak"),
    new User("Jan", "Peterson", "jan@mail.nl", "wachtwoord", "jan", []),
    new User("Piet", "Falliet", "PIET@mail.nl", "wachtwoord", "piet"),
    new User("Mia", "Aim", "mia@mail.nl", "wachtwoord", "mia"),
    new User("Kees", "Apenvlees", "kees@mail.nl", "wachtwoord", "kees")
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    new Task(1, "Layout of landing page", TaskCategory.Design, TaskPriority.Low, new Date(), new Date("2020-04-18"), 50),
    new Task(2, "Payment system with PayPal", TaskCategory.Code, TaskPriority.Medium, new Date("2026-07-12"), new Date("2023-11-09"), 60),
    new Task(3, "Payment system with Creditcard", TaskCategory.Test, TaskPriority.High, new Date("2003-08-05"), new Date("2001-12-31"), 25),
    new Task(4, "Backwards compatability with API version 1", TaskCategory.Implement, TaskPriority.Top, new Date("2014-02-26"), new Date("2014-01-22"), 100),
    new Task(5, "Splash screen load times", TaskCategory.Refactor, TaskPriority.Medium, new Date("2000-06-12"), new Date("1999-05-04"))
  ]);

  return (
    <UsersContext.Provider value={{users, setUsers}} >
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}} >
        <TaskItemsContext.Provider value={{tasks, setTasks}} >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/landing" element={<LandingScreen />} />
              <Route path="/sign-up" element={<SignUpScreen />} />
              <Route path="/sign-in" element={<SignInScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/calendar" element={<CalendarScreen />} />
              <Route path="/statistics" element={<StatisticsScreen />} />
              <Route path="/account" element={<AccountScreen />} />
            </Routes>
          </BrowserRouter>
        </TaskItemsContext.Provider>
      </CurrentUserContext.Provider>
    </UsersContext.Provider>
  );
}
