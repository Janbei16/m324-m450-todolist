'use client';

import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  const getInitialTodos = () => {
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  useEffect(() => {
    setTodos(getInitialTodos());
  }, []);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodoItem = ({ title, priority, dueDate }) => {
    const newTodo = {
      id: uuidv4(),
      title,
      priority,
      dueDate: dueDate || "",
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  const updatePriority = (id, newPriority) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.priority = newPriority;
        }
        return todo;
      })
    );
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    const difference = due - now;
    return difference <= 24 * 60 * 60 * 1000 && difference > 0;
  };

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo addTodoProps={addTodoItem} />
      <TodosList
        todos={sortTodos(todos)}
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        setUpdate={setUpdate}
        updatePriority={updatePriority}
        isDueSoon={isDueSoon}
      />
    </div>
  );
};

export default TodoContainer;