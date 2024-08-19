import React, { useState } from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UpdaterContext } from "./contexts/updater/updaterContext";
import { CurrentUserContext } from "./contexts/currentUser/currentUserContext";
import User from "./classes/user/user";
import Task from "./classes/task/task";
import Updater from "./classes/updater/updater";
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

import { getUsers, getTasks } from "./utils/queries";
import { useQuery } from "@apollo/client";

function defineTasks() {
  const { loading, error, data } = useQuery(getTasks);
  return data;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>();

  const { loading, error, data } = useQuery(getUsers);
  const userData = data;
  const taskData = defineTasks();

  console.log(userData);
  console.log(taskData);

  const defaultUsers = [
    new User("Sarthak", "Epic", "sarthak@mail.nl", "wachtwoord", "sarthak"),
    new User("Jan", "Peterson", "jan@mail.nl", "wachtwoord", "jan", []),
    new User("Piet", "Falliet", "PIET@mail.nl", "wachtwoord", "piet"),
    new User("Mia", "Aim", "mia@mail.nl", "wachtwoord", "mia"),
    new User("Kees", "Apenvlees", "kees@mail.nl", "wachtwoord", "kees")
  ];

  const defaultTasks = [
    new Task(1, "Layout of landing page", TaskCategory.Design, TaskPriority.Low, new Date(), new Date("2020-04-18"), 50),
    new Task(2, "Payment system with PayPal", TaskCategory.Code, TaskPriority.Medium, new Date("2026-07-12"), new Date("2023-11-09"), 60),
    new Task(3, "Payment system with Creditcard", TaskCategory.Test, TaskPriority.High, new Date("2003-08-05"), new Date("2001-12-31"), 25),
    new Task(4, "Backwards compatability with API version 1", TaskCategory.Implement, TaskPriority.Top, new Date("2014-02-26"), new Date("2014-01-22"), 100),
    new Task(5, "Splash screen load times", TaskCategory.Refactor, TaskPriority.Medium, new Date("2000-06-12"), new Date("1999-05-04"))
  ];

  const [updater, setUpdater] = useState<Updater>(new Updater(defaultUsers, defaultTasks));

  return (
    <UpdaterContext.Provider value={{updater, setUpdater}} >
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}} >
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
      </CurrentUserContext.Provider>
    </UpdaterContext.Provider>
  );
}
