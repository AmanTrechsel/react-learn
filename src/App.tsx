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

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>();;

  const [updater, setUpdater] = useState<Updater>(new Updater());
  
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
