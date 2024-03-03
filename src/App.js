import React, {Suspense} from "react";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import LoadingCircle from "./Component/LoadingCircle";
// import Dashboard from "./Component/Dashboard";

import "./App.css";
import { Route, Routes } from "react-router-dom";

const LazyDashboard = React.lazy(()=> import("./Component/Dashboard"));

const App = ()=>{

  return(
    <>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <Suspense fallback={<LoadingCircle />}>
          <LazyDashboard />
        </Suspense>
      } />
    </Routes>
    </>
  )
}

export default App;