import React, { useState, useEffect } from "react";
import Button from "./widgets/Button";
import { AiOutlineDelete } from "react-icons/ai";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [activeLink, setActiveLink] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All");

  const handleClick = (index) => {
    setActiveLink(index);
  };
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const deleteAllCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") {
      return !task.completed;
    } else if (filter === "Completed") {
      return task.completed;
    }
    return true;
  });

  return (
    <div className="  flex justify-center space-y-6 border-red  items-center mt-12">
      <div>
        {/*todo techLift title */}
        <div>
          <p className="text-2xl text-techLiftBlack font-bold flex justify-center">
            #todo
          </p>
        </div>
        {/* toggle navbar */}
        <div className="flex justify-between items-center gap-52 my-4 px-8 w-full cursor-pointer">
          <div onClick={() => setFilter("All")}>
            <p
              className={`${
                activeLink === 0
                  ? "  border-techLiftPrimary2 underline underline-offset-[20px] text-xl decoration-techLiftPrimary2 decoration-4 "
                  : "text-techLiftBlack text-xl"
              } `}
              onClick={() => handleClick(0)}
            >
              All
            </p>
          </div>
          <div onClick={() => setFilter("Active")}>
            <p
              className={`${
                activeLink === 1
                  ? "  border-techLiftPrimary2 underline underline-offset-[20px] text-xl decoration-techLiftPrimary2 decoration-4 "
                  : "text-techLiftBlack text-xl"
              } `}
              onClick={() => handleClick(1)}
            >
              Active
            </p>
          </div>
          <div onClick={() => setFilter("Completed")}>
            <p
              className={`${
                activeLink === 2
                  ? "  border-techLiftPrimary2 underline underline-offset-[20px] text-xl decoration-techLiftPrimary2 decoration-4 "
                  : "text-techLiftBlack text-xl"
              } `}
              onClick={() => handleClick(2)}
            >
              Completed
            </p>
          </div>
        </div>
        <hr className="w-full border border-techLiftGray4" />
        <br />
        {/* todoList form */}
        <form onSubmit={addTask}>
          <div className="flex  gap-4 w-full justify-center">
            <input
              className=" border-2 border-techLiftGray4 h-10 rounded-md w-full  pl-3 "
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="add details"
            />
            <Button
              type="submit"
              className="text-techLiftWhite w-32 rounded-lg py-2 bg-techLiftPrimary2"
            >
              Add
            </Button>
          </div>

          <ul>
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="my-4 flex justify-between items-center"
              >
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => completeTask(task.id)}
                    className="cursor-pointer"
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                </div>
                 <Button onClick={() => deleteTask(task.id)}>
                  <AiOutlineDelete className="h-6 w-6 text-techLiftGray" />
                </Button> 
              </li>
            ))}
          </ul>
          {filter === "Completed" && (
            <div className="flex justify-between mt-4">
              <div></div>
              <Button
                className="bg-techLiftRed2 text-techLiftWhite flex items-center gap-1  px-5 py-2 rounded-md"
                onClick={deleteAllCompletedTasks}
              >
                <AiOutlineDelete />
                delete all
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TodoList;
