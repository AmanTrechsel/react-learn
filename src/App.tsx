import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInScreen from "./screens/signIn/signIn";
import SignUpScreen from "./screens/signUp/signUp";
import SplashScreen from "./screens/splash/splash";
import LandingScreen from "./screens/landing/landing";

import HomeScreen from "./screens/home/home";
import CalendarScreen from "./screens/calendar/calendar";
import StatisticsScreen from "./screens/statistics/statistics";
import AccountScreen from "./screens/account/account";

export default function Profile() {
  return (
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
  );
}
