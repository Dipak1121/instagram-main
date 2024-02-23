import React from "react";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";

import "./App.css";
import { Route, Routes } from "react-router-dom";

const App = ()=>{

  return(
    <>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App;