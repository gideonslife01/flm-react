// App.tsx
import { useState } from "react";
import { Routes, Route, NavLink, useMatch } from "react-router-dom";
import "./App.css";

// page component
function Home() {
  return (
    <div className="page">
      <h1>🏠 Home</h1>
      <p>여기는 메인 페이지입니다.</p>
      <p>This is the main page.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>📘 About</h1>
      <p>이 프로젝트는 Vite + React 예제입니다.</p>
      <p>This project is a Vite + React example.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1>📞 Contact</h1>
      <p>contact@example.com</p>
    </div>
  );
}

// 메인 App 컴포넌트
function App() {
  return (
    <div className="container">
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 처리 (선택사항) */}
          <Route path="*" element={<div>페이지를 찾을 수 없습니다 😅</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
