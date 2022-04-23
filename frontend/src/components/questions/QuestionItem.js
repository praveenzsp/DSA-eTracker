import React, { useContext, useEffect, useRef, useState } from "react";
import "./QuestionItem.css";
import { Link } from "react-router-dom";
import QuestionContext from "../../context/Questions/QuestionContext";
import Modal from "../Modal";

import { ToastContainer, toast } from "react-toastify";

export default function QuestionItem(props) {
  let questionContext = useContext(QuestionContext);
  let { fetchQuestions, updateSolved, solved, notes } = questionContext;
  useEffect(() => {
    // console.log("qi");
    fetchQuestions();
  }, []);

  let { q_no, link, name, difficulty, resource } = props.question;
  const toggleSolve = (e) => {
    updateSolved(q_no);
    if (!solved[q_no]) toast.success("Well Done! Try next problem");
    else toast.success("Marked as unsolved");
  };
  const [showModal, setshowModal] = useState(false);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <div className="each-question">
      <div className="question-name">{name}</div>
      <div className="difficulty">
        {difficulty == "easy" ? (
          <div className="easy">easy</div>
        ) : difficulty == "medium" ? (
          <div className="medium">medium</div>
        ) : (
          <div className="hard">hard</div>
        )}
      </div>
      <div className="mark">
        <button className="mark-button" onClick={toggleSolve}>
          {solved[q_no] === false ? "Mark as Solved" : "Mark as Unsolved"}
        </button>
      </div>
      <div className="solve">
        <a href={link} target="_blank">
          <button className="solve-button">
            {solved[q_no] === false ? "Solve" : "Solved✔️"}
          </button>
        </a>
      </div>
      <div className="options dropup">
        <Link
          className="dropdown-toggle"
          to="#"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="material-icons-outlined material-icons dots">
            more_vert
          </span>
        </Link>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item dpd" href={resource} target="_blank">
              check editorial
            </a>
          </li>
          <li>
            <button className="dropdown-item dpd" onClick={toggleModal}>
              take notes
            </button>
          </li>
        </ul>
      </div>
      {showModal ? (
        <Modal question={props.question} toggleModal={toggleModal}></Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
