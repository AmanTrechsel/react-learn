import React, { useState } from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UsersContext } from "./contexts/users/usersContext";
import { CurrentUserContext } from "./contexts/currentUser/currentUserContext";
import User from "./classes/user/user";
import Todo from "./classes/todo/todo";
import { TodoCategory } from "./components/todoItem/todoCategory";
import { TodoPriority } from "./components/todoItem/todoPriority";

import SignInScreen from "./screens/signIn/signIn";
import SignUpScreen from "./screens/signUp/signUp";
import SplashScreen from "./screens/splash/splash";
import LandingScreen from "./screens/landing/landing";

import HomeScreen from "./screens/home/home";
import CalendarScreen from "./screens/calendar/calendar";
import StatisticsScreen from "./screens/statistics/statistics";
import AccountScreen from "./screens/account/account";
import { TodoItemsContext } from "./contexts/todoItems/todoItemsContext";

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

  const [tasks, setTasks] = useState<Todo[]>([
    new Todo(1, "Layout of landing page", TodoCategory.Design, TodoPriority.Low, new Date(), new Date("2020-04-18"), 50),
    new Todo(2, "Payment system with PayPal", TodoCategory.Code, TodoPriority.Medium, new Date("2026-07-12"), new Date("2023-11-09"), 60),
    new Todo(3, "Payment system with Creditcard", TodoCategory.Test, TodoPriority.High, new Date("2003-08-05"), new Date("2001-12-31"), 25),
    new Todo(4, "Backwards compatability with API version 1", TodoCategory.Implement, TodoPriority.Top, new Date("2014-02-26"), new Date("2014-01-22"), 100),
    new Todo(5, "Splash screen load times", TodoCategory.Refactor, TodoPriority.Medium, new Date("2000-06-12"), new Date("1999-05-04"))
  ]);

  return (
    <UsersContext.Provider value={{users, setUsers}} >
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}} >
        <TodoItemsContext.Provider value={{tasks, setTasks}} >
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
        </TodoItemsContext.Provider>
      </CurrentUserContext.Provider>
    </UsersContext.Provider>
  );
}
