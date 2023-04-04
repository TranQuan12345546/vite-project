import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
const API_URL = "http://localhost:8080/api/todos"

function TodoList(props) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

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

  const addTodo = async () => {
    if (title.trim() === "") {
        alert("Title should not be empty!");
        return;
    }
    const newTodo ={
        title: title
    }

    // Goi Post API de tao todo moi
    try {
      let postResult = await fetch(API_URL, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify(newTodo)
      });
      if (postResult.status === 201) {
        let createdTodo = await postResult.json();
        console.log(createdTodo);
        let updatedTodos = [...todos, createdTodo];
        setTodos(updatedTodos);
        setTitle("");
      } else {
        console.error(postResult);
        alert('Error when creating new todo item');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handeEdit = async (index) => {
    
  };

  return (
    <>
      <h1>TodoList App</h1>
      {/* Input bar */}
      <input id="todoText" type="text" placeholder="Enter todo title..." value={title} onChange={e => setTitle(e.target.value)}/>
      <button id="addtodoButton" onClick={addTodo}>Add</button>

      {/* list */}
      <ul>
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handeDelete} onChange={handeEdit} />
          ))}
      </ul>
    </>
  );
}
export default TodoList;