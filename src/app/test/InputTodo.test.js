import { render, screen, fireEvent } from "@testing-library/react";
import InputTodo from "../components/InputTodo";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock alert
});

afterEach(() => {
  jest.restoreAllMocks(); // Restore the original implementation
});

describe("InputTodo Component", () => {
  test("TC-1: Create a task with high, medium, or low priority", () => {
    const addTodoMock = jest.fn();
    render(<InputTodo addTodoProps={addTodoMock} />);

    const input = screen.getByPlaceholderText("Add todo...");
    const prioritySelect = screen.getByRole("combobox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "High Priority Task" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    fireEvent.click(button);

    expect(addTodoMock).toHaveBeenCalledWith({
      title: "High Priority Task",
      priority: "high",
      dueDate: "",
    });
  });

  test("TC-4: Create a task without explicitly selecting priority (default)", () => {
    const addTodoMock = jest.fn();
    render(<InputTodo addTodoProps={addTodoMock} />);

    const input = screen.getByPlaceholderText("Add todo...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Default Priority Task" } });
    fireEvent.click(button);

    expect(addTodoMock).toHaveBeenCalledWith({
      title: "Default Priority Task",
      priority: "medium",
      dueDate: "",
    });
  });

  test("TC-5: Invalid priority input (negative test)", () => {
    const addTodoMock = jest.fn();
    render(<InputTodo addTodoProps={addTodoMock} />);

    const input = screen.getByPlaceholderText("Add todo...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "" } }); // Empty title
    fireEvent.click(button);

    expect(addTodoMock).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Please write item");
  });
  test("TC-6: Create a task with a valid due date", () => {
    const addTodoMock = jest.fn();
    render(<InputTodo addTodoProps={addTodoMock} />);

    const input = screen.getByPlaceholderText("Add todo...");
    const dueDateInput = screen.getByLabelText("Due date");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Task with Due Date" } });
    fireEvent.change(dueDateInput, { target: { value: "2025-01-15" } });
    fireEvent.click(button);

    expect(addTodoMock).toHaveBeenCalledWith({
      title: "Task with Due Date",
      priority: "medium",
      dueDate: "2025-01-15",
    });
  });
  test("TC-10: Enter a past due date", () => {
    const addTodoMock = jest.fn();
    render(<InputTodo addTodoProps={addTodoMock} />);

    const input = screen.getByPlaceholderText("Add todo...");
    const dueDateInput = screen.getByLabelText("Due date");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Task with Past Date" } });
    fireEvent.change(dueDateInput, { target: { value: "2023-01-01" } }); // Past date
    fireEvent.click(button);

    expect(addTodoMock).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "The due date cannot be in the past"
    );
  });
});
