import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isActive, setIsActive] = useState(false);

  // 1. 처음 로드될 때 서버에서 상태 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3000/status")
      .then((res) => setIsActive(res.data.is_active))
      .catch((err) => console.error(err));
  }, []);

  // 2. 버튼 클릭 시 토글 요청
  const handleToggle = async () => {
    try {
      const nextState = !isActive;
      const res = await axios.post("http://localhost:3000/toggle", {
        isActive: nextState,
      });
      setIsActive(res.data.is_active);
    } catch (err) {
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // 세로 중앙 정렬 / Vertical center alignment
        alignItems: "center", // 가로 중앙 정렬 / horizontal center alignment
        height: "100vh", // 화면 전체 높이 사용 / Use full screen height
        width: "100vw", // 화면 전체 너비 사용 / Use full screen width
        margin: 0, // 기본 여백 제거 / Remove default margins
      }}
    >
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>
          현재 상태/Current Status:{" "}
          {isActive ? "🔵 활성/Active" : "🔴 비활성/inActive"}
        </h2>
        <button
          onClick={handleToggle}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: isActive ? "#4CAF50" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isActive ? "비활성화하기/InActivate" : "활성화하기/Activate"}
        </button>
      </div>
    </div>
  );
}

export default App;
