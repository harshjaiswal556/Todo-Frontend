import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
export default function ToDo({
  text,
  updateMode,
  deleteTodo,
  lastEdit,
  email,
  emailId,
  theme,
}) {
  return (
    <>
      {email === emailId ? (
        <div className={`todo${theme}`}>
          <div className={`text${theme}`}>{text}</div>
          <div className="icons">
            <BiEdit className={`icon${theme}`} onClick={updateMode}></BiEdit>
            <AiFillDelete
              className={`icon${theme}`}
              onClick={deleteTodo}
            ></AiFillDelete>
          </div>
          <div className={`lastEdit${theme}`}>
            Last Edit: {lastEdit.slice(0, 25)}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <div className={`text${theme}`}>{text}</div>
      <div className="icons">
        <BiEdit className={`icon${theme}`} onClick={updateMode}></BiEdit>
        <AiFillDelete
          className={`icon${theme}`}
          onClick={deleteTodo}
        ></AiFillDelete>
      </div>
      <div className={`lastEdit${theme}`}>
        Last Edit: {lastEdit.slice(0, 25)}
      </div> */}
    </>
  );
}
