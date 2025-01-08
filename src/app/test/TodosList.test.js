import { render, screen } from "@testing-library/react";
import TodosList from "../components/TodosList";
import "@testing-library/jest-dom";

describe("TodosList Component", () => {
  test("TC-2: Display task priority correctly in the list", () => {
    const todos = [
      { id: 1, title: "Task 1", priority: "high", dueDate: "" },
      { id: 2, title: "Task 2", priority: "medium", dueDate: "" },
    ];

    render(
      <TodosList
        todos={todos}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={jest.fn()}
      />
    );

    todos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
      expect(screen.getByText(`(${todo.priority})`)).toBeInTheDocument();
    });
  });

  test("TC-3: Sort tasks by priority", () => {
    const todos = [
      { id: 1, title: "Low Priority Task", priority: "low", dueDate: "" },
      { id: 2, title: "High Priority Task", priority: "high", dueDate: "" },
      { id: 3, title: "Medium Priority Task", priority: "medium", dueDate: "" },
    ];

    render(
      <TodosList
        todos={todos.sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={jest.fn()}
      />
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("High Priority Task");
    expect(items[1]).toHaveTextContent("Medium Priority Task");
    expect(items[2]).toHaveTextContent("Low Priority Task");
  });

  test("TC-7: Display the due date in the task list", () => {
    const todos = [
      { id: 1, title: "Task 1", priority: "high", dueDate: "2025-01-15" },
      { id: 2, title: "Task 2", priority: "medium", dueDate: "2025-01-20" },
    ];

    render(
      <TodosList
        todos={todos}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={jest.fn(() => false)} // Ensure mock returns false
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("15.1.2025"))
    ).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("20.1.2025"))
    ).toBeInTheDocument();
  });

  test("TC-9: Sort tasks by due date", () => {
    const todos = [
      { id: 1, title: "Task 1", priority: "high", dueDate: "2025-01-20" },
      { id: 2, title: "Task 2", priority: "medium", dueDate: "2025-01-15" },
    ];

    render(
      <TodosList
        todos={todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={jest.fn()}
      />
    );

    const tasks = screen.getAllByRole("listitem");
    expect(tasks[0]).toHaveTextContent("Task 2");
    expect(tasks[1]).toHaveTextContent("Task 1");
  });
});
