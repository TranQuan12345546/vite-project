import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
const API_URL = "http://localhost:8080/api/todos"

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState();

  useEffect(() => {
    const getAllTodoList = async () => {
        try {
            let todoList = await (await fetch(API_URL)).json();
            console.log("loading todoList:", todoList);
            setTodos(todoList);
        } catch (error) {
            console.error(error);
        }
    }
    getAllTodoList();
  }, []);

  const handeDelete = async (index) => {
    try {
      let result = await fetch(API_URL + "/" + index, {
        method: "DELETE",
      });
      if (result.status === 204) {
        let resultTodoList = todos.filter((todo) => todo.id !== index);
        setTodos(resultTodoList);
      } else {
        console.error(result);
        alert("error when delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>TodoList App</h1>
      {/ Input bar /}
      <input id="todoText" type="text" placeholder="Enter todo title..." value={title} onChange={e => setTitle(e.target.value)}/>
      <button id="addtodoButton" >Add</button>

      {/ list /}
      <ul>
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handeDelete} />
          ))}
      </ul>
    </>
  );
}
export default TodoList;