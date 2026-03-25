import { useState } from "react";
import "./App.css";

type Page = "home" | "about" | "contact";

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

function App() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <nav className="nav">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("contact")}>Contact</button>
      </nav>

      <div className="content">{renderPage()}</div>
    </div>
  );
}

export default App;
