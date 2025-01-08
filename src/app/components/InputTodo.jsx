/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name}: ${value}`); // Debug log
    setInputText({
      ...inputText,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const dueDate = new Date(inputText.dueDate);

    if (inputText.title.trim() === "") {
      alert("Please write item");
      return;
    }

    if (inputText.dueDate && dueDate < now) {
      alert("The due date cannot be in the past");
      return;
    }

    props.addTodoProps(inputText);
    setInputText({
      title: "",
      priority: "medium",
      dueDate: "",
    });
  };

  return (
    <form
      data-set="todo-form"
      onSubmit={handleSubmit}
      className="form-container"
    >
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={inputText.title}
        name="title" // Ensure this matches state property
        onChange={onChange}
      />
      <select
        name="priority"
        value={inputText.priority}
        onChange={onChange}
        className="priority-select"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input
        type="date"
        name="dueDate" // Ensure this matches state property
        value={inputText.dueDate}
        onChange={onChange}
        className="date-input"
        aria-label="Due date" // Added for accessibility
      />
      <button
        data-set="add-todo-btn"
        className="input-submit"
        aria-label="Add Todo"
      >
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
