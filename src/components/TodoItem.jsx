import React from 'react';

function TodoItem({todo, onDelete, onChange}) {

  const handleDelete = () => {
    onDelete(todo.id);  
  }

  const handleEdit = () => {
    onChange(todo.id)
  }
  return (
    <li>
        <input  type='checkbox'></input>
        <span className='title'>{todo.title}</span>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

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

  export default TodoItem;  