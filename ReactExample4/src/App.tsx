import React, { useState } from "react";
import UserCard from "./components/UserCard";
import type { Todo } from "./types";

// 함수 타입 지정: string을 받아 string을 반환
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function App() {
  // State 타입 지정
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Vite", completed: false },
    { id: 2, text: "Practice TypeScript", completed: true },
  ]);
  // 상태반전
  const toggleTodo = (id: number) => {
    // prev: 이전 상태값
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vite + React + TypeScript Example</h2>
      <p>{greet("Johnny")}</p>

      <h2>User Cards</h2>
      <UserCard name="Alice" age={25} />
      <UserCard name="Bob" />

      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
