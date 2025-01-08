import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import "@testing-library/jest-dom";

describe("TodoItem Component", () => {
  test("TC-2: Display task priority correctly", () => {
    const todo = { id: 1, title: "Task 1", priority: "high", dueDate: "" };
    render(
      <TodoItem
        todo={todo}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={jest.fn()}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("(high)")).toBeInTheDocument();
  });

  test("TC-4: Task with default priority", () => {
    const todo = {
      id: 2,
      title: "Default Task",
      priority: "medium",
      dueDate: "",
    };
    render(
      <TodoItem
        todo={todo}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={jest.fn()}
      />
    );

    expect(screen.getByText("(medium)")).toBeInTheDocument();
  });
  test("TC-8: Highlight tasks with deadlines within the next 24 hours", () => {
    const todo = {
      id: 1,
      title: "Due Soon Task",
      priority: "medium",
      dueDate: new Date(Date.now() + 23 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Within 24 hours
    };

    const isDueSoonMock = jest.fn((dueDate) => {
      const now = new Date();
      const due = new Date(dueDate);
      const difference = due - now;
      return difference <= 24 * 60 * 60 * 1000 && difference > 0;
    });

    render(
      <TodoItem
        todo={todo}
        handleChangeProps={jest.fn()}
        deleteTodoProps={jest.fn()}
        setUpdate={jest.fn()}
        updatePriority={jest.fn()}
        isDueSoon={isDueSoonMock}
      />
    );

    const dueDateElement = screen.getByText((content) =>
      content.includes("9.1.2025")
    ); // Custom matcher to find the text
    expect(dueDateElement).toHaveStyle("color: blue"); // Color for tasks due soon
  });
});
