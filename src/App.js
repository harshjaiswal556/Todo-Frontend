import { useEffect, useState } from "react";
// import { updateTodo } from "../../backend/controllers/ToDoControllers";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [theme, setTheme] = useState("light");
  const [todoShow, setTodoShow] = useState(false);
  const [fixEmail, setFixEmail] = useState(false);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    getAllToDo(setToDo);
  }, []);
  const updateMode = (_id, text) => {
    if (isUpdate) {
      setIsUpdate(false);
      setText("");
      setTodoId("");
    } else {
      setIsUpdate(true);
      setText(text);
      setTodoId(_id);
    }
  };
  const doEmailFix = () => {
    setTodoShow(true);
    setFixEmail(true);
  };
  return (
    <div className={`${theme}App`}>
      <div className="container">
        <div className="heading">
          <h1 className={`heading${theme}`}>ToDo App</h1>{" "}
          <input
            id="checkbox"
            className="toggleSwitch"
            type="checkbox"
            name="checkbox"
            onClick={toggleTheme}
          ></input>
          <label className="label" for="checkbox"></label>
        </div>
        <div className="top">
          {!fixEmail ? (
            <>
              <input
                className={theme}
                type="email"
                placeholder="Enter Email to get todo details"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className={`add${theme}`} onClick={doEmailFix}>
                Get
              </div>
            </>
          ) : (
            <>
              <input
                readOnly
                className={theme}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className={`add${theme}`}>Get</div>
            </>
          )}
        </div>
        <div className="top">
          <input
            className={theme}
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <div
            className={`add${theme}`}
            onClick={
              isUpdate
                ? () =>
                    updateToDo(
                      todoId,
                      text,
                      setToDo,
                      setText,
                      setIsUpdate,
                      Date(Date.now())
                    )
                : () =>
                    addToDo(
                      text,
                      setText,
                      setToDo,
                      email,
                      setEmail,
                      Date(Date.now())
                    )
            }
          >
            {isUpdate ? "Update" : "Add"}
          </div>
        </div>
        {todoShow ? (
          <div className="list">
            {toDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                lastEdit={item.lastEdit}
                email={item.email}
                emailId={email}
                theme={theme}
                updateMode={() => updateMode(item._id, item.text)}
                deleteTodo={() => deleteToDo(item._id, setToDo)}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
        {/* <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              lastEdit={item.lastEdit}
              email={item.email}
              theme={theme}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default App;
