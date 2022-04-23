import QuestionContext from "./QuestionContext";
import React from "react";
import { useState } from "react";
import { all_questions, categories } from "../../helper/helper";
export default function QuestionState(props) {
  let count_solved = new Map();
  const [solved, setsolved] = useState([]);
  const [notes, setnotes] = useState([]);
  const [countQuestions, setcountQuestions] = useState(new Map());
  let helpSolved=[];
  let s = 0,
    e = 0,
    m = 0,
    h = 0,
    t = 0;
  const updateCountSolved = () => {
    // console.log(solved);
    categories.forEach(countSolved);
  };
  function countSolved(val, ind) {
    let questions = all_questions[val];
    s = 0;
    e = 0;
    m = 0;
    h = 0;
    t = 0;
    questions.forEach(countCategorySolved);
    let count = {
      total: t,
      solved:s,
      easy: e,
      medium: m,
      hard: h,
    };
    count_solved[val] = count;
  }
  function countCategorySolved(val, ind) {
    //  console.log(val["q_no"],helpSolved[val["q_no"]]);
    if (helpSolved[val["q_no"]]) {
      // console.log("hello");
      s++;
      if (val.difficulty == "easy") e++;
      else if (val.difficulty == "medium") m++;
      else h++;
    }
    t++;
  }

  const fetchQuestions = async () => {
    // console.log("fetchquestion")
    // console.log(localStorage.getItem('auth-token'));
    let response = await fetch(
      "http://localhost:5000/questions/fetchQuestions/",
      {
        method: "GET",
        headers: {
          "Content-type": "application-json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    let data = await response.json();

    setsolved(data.questions.solved);
    setnotes(data.questions.notes);
    helpSolved=data.questions.solved;
    updateCountSolved();
     //console.log(count_solved);

   
    setcountQuestions(count_solved);
      
    //console.log(solved);
  };

  const updateSolved = async (q_no) => {
    let response = await fetch(
      `http://localhost:5000/questions/updateSolved/${q_no}`,
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    let data = await response.json();
    fetchQuestions();
    // setsolved(data.questions.solved);
    // setnotes(data.questions.notes);
    // helpSolved=data.questions.solved;
    // updateCountSolved();
     //console.log(count_solved);
    // setcountQuestions(count_solved);
    //console.log(solved);
  };

  const updateNotes = async (q_no, updatedNotes) => {
    // console.log(q_no,updatedNotes);

    let response = await fetch(
      `http://localhost:5000/questions/updateNotes/${q_no}`,
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: updatedNotes,
        }),
      }
    );
    let data = await response.json();
    fetchQuestions();
  };
  return (
    <QuestionContext.Provider
      value={{
        fetchQuestions,
        updateSolved,
        updateNotes,
        solved,
        notes,
        countQuestions,
       
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
}
