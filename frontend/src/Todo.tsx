import { useState } from "react";
import { TodoDTO } from "./App";
import axios from "axios";
import { FaEdit, FaCheck } from "react-icons/fa";
// import {host} from "./constants";

type Props = {
  todo: TodoDTO;
  updateTodos: (todos: TodoDTO[]) => void;
};

const Todo = ({ todo, updateTodos }: Props) => {
  const [complete, setComplete] = useState(todo.done);
  const [newTitle, setNewTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [editDescription, setEditDescription] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(e.target.value);
  };

  // const editTodo = (key: string, value: string | boolean) => {
  //   const updatedTodo = { ...todo, [key]: value };
  //   axios
  //     .put(`http://${host}/api/todos/${todo.id}`, {
  //       todo: updatedTodo,
  //     })
  //     .then((response) => {
  //       updateTodos(response.data);
  //     });
  // };

  const editTodo = (key: string, value: string | boolean) => {
    const updatedTodo = { ...todo, [key]: value };
    axios
      .put("http://localhost:3000/api/todos/${todo.id}", updatedTodo)
      .then((response) => {
        updateTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the todo!", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Request data:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message:", error.message);
        }
        console.log("Config:", error.config);
      });
  };
  

  return (
    <div
      key={todo.id}
      className={complete ? "complete card" : "incomplete card"}
    >
      <div className="todo-section">
        {editTitle ? (
          <input
            type="text"
            placeholder={todo.title}
            name="title"
            onChange={handleTitleChange}
          />
        ) : (
          <h3>{todo.title}</h3>
        )}
        {editTitle ? (
          <FaCheck
            className="icon"
            onClick={() => {
              setEditTitle(false);
              editTodo("title", newTitle);
            }}
          />
        ) : (
          <FaEdit
            className="icon"
            onClick={() => {
              setEditTitle(true);
            }}
          />
        )}
      </div>
      <div className="todo-section">
        {editDescription ? (
          <textarea
            placeholder={todo.description}
            onChange={handleDescriptionChange}
            name="description"
          />
        ) : (
          <div>{todo.description}</div>
        )}
        {editDescription ? (
          <FaCheck
            className="icon"
            onClick={() => {
              setEditDescription(false);
              editTodo("description", newDescription);
            }}
          />
        ) : (
          <FaEdit
            className="icon"
            onClick={() => {
              setEditDescription(true);
            }}
          />
        )}
      </div>
      <button
        onClick={() => {
          setComplete(!complete);
          editTodo("done", !complete);
        }}
      >
        {complete ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
};

export default Todo;
