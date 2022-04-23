import React from "react";
import Navbar from "./components/Navbar";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import CategoryQuestions from "./components/questions/CategoryQuestions";
import QuestionState from "./context/Questions/QuestionState";
import AlertState from "./context/Alert/AlertState";
import Alert from "./components/Alert"
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  return (
    <>
    <ToastContainer/>
      <AlertState> 
      <QuestionState>
        <BrowserRouter>
          <Navbar></Navbar>
          <Alert> </Alert>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categoryQuestions" element={<CategoryQuestions />} />
          </Routes>
      {/* </ToastContainer> */}
        </BrowserRouter>
      </QuestionState>
      </AlertState>
    </>
  );
}
