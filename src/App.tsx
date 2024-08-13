import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInScreen from "./screens/signIn";
import SignUpScreen from "./screens/signUp";
import SplashScreen from "./screens/splash";

export default function Profile() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route path="/sign-in" element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
