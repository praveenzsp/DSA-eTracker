import React, { useContext, useEffect, useState,useRef } from "react";
import { useLocation } from "react-router-dom";
import { all_questions } from "../../helper/helper";
import QuestionItem from "./QuestionItem";
import QuestionContext from "../../context/Questions/QuestionContext";

import "./CategoryQuestions.css";
export default function CategoryQuestions() {
  const location = useLocation();
  const { category } = location.state;
  let questionContext = useContext(QuestionContext);
  let { fetchQuestions, updateSolved, solved, notes, countQuestions } =
    questionContext;
  let category_count = countQuestions[category];
  const [scroll, setscroll] = useState(false);
  const [count, setcount] = useState(null);
   useEffect(() => {
    //  console.log("category-question")

    // fetchQuestions();
    
    if (scroll === false) {
      window.scrollTo(0, 0);
      setscroll(true);
    }
    if (countQuestions !== null) {
      // window.scrollTo(0,0);
      category_count = countQuestions[category];
      if (category_count) {
        //console.log(category_count.total)
        let easy = category_count.easy;
        let medium = category_count.medium;
        let hard = category_count.hard;
        // if(count.easy!=easy && count.medium!=medium && count.hard!=hard){
        setcount({
          easy: easy,
          medium: medium,
          hard: hard,
        });
        // }
        //  console.log(count);
        // prevCountRef.current = count;
      }
    }
  }, [countQuestions]);

  let questions = all_questions[category];
  return (
    <div className="category-questions">
      <div className="cat-head">
        {" "}
        <h1>{category}</h1>
      </div>
      {count !== null ? (
        <div className="show-count">
           <h3 className="count-title">Solved</h3>
          <h3 className="count-easy">{`EASY - ${count.easy}`}</h3>
          <h3 className="count-medium">{`MEDIUM - ${count.medium}`}</h3>
          <h3 className="count-hard">{`HARD - ${count.hard}`}</h3>
        </div>
      ) : (
        <></>
      )}
      <div className="cat-probs">
        {questions.map((question) => {
          // console.log(question);
          return (
            <QuestionItem
              question={question}
              key={question.q_no}
            ></QuestionItem>
          );
        })}
      </div>
    </div>
  );
}
