import React from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import About from "./about/About";
import Categories from "./category/Categories";
import { useContext } from "react";
import QuestionContext from "../context/Questions/QuestionContext";
export default function Home() {
  let navigate = useNavigate();
  let questionContext = useContext(QuestionContext);
  let { fetchQuestions } = questionContext;
  useEffect(() => {
    if (localStorage.getItem("auth-token") === null) {
      navigate("/signin");
    }
    fetchQuestions();
  }, []);

  return (
    <div>
      <About></About>
      <Categories></Categories>
    </div>
  );
}
