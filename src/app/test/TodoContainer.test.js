import { render, screen, fireEvent } from "@testing-library/react";
import TodoContainer from "../components/TodoContainer";
import "@testing-library/jest-dom";

describe("TodoContainer Component", () => {
  test("TC-1: Create and display a task with priority", () => {
    render(<TodoContainer />);

    const input = screen.getByPlaceholderText("Add todo...");
    const prioritySelect = screen.getByRole("combobox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    fireEvent.click(button);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("(high)")).toBeInTheDocument();
  });
  test("TC-6: Create and display a task with a valid due date", () => {
    render(<TodoContainer />);

    const input = screen.getByPlaceholderText("Add todo...");
    const dueDateInput = screen.getByLabelText("Due date");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Integration Test Task" } });
    fireEvent.change(dueDateInput, { target: { value: "2025-01-15" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Integration Test Task")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.trim().includes("15.1.2025"))
    ).toBeInTheDocument(); // Flexible matcher for due date
  });
});
