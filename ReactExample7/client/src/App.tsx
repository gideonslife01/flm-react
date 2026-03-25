import React, { useState } from "react";

function UserComponent() {
  const [userId, setUserId] = useState("1"); // 기본값 1번 유저 / Default user number 1
  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState("");

  const updateUI = async (res) => {
    const data = await res.json();
    setUserData(res.ok ? data : null);
    setLog(JSON.stringify(data, null, 2));
  };

  const getUser = () => fetch(`/users/${userId}`).then(updateUI);

  const createUser = () =>
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "NewUser",
        age: 30,
        nickname: "SilverHand",
      }),
    }).then(updateUI);

  const patchUser = () =>
    fetch(`/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      // 닉네임만 변경 시도 / Try changing only your nickname
      body: JSON.stringify({ nickname: "Johnny" }),
    }).then(updateUI);

  const putUser = () =>
    fetch(`/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // 전체 교체 (nickname 누락 시 사라짐 확인용)
      // Replace all (to check if nickname disappears when missing)
      body: JSON.stringify({ name: "John", age: 25 }),
    }).then(updateUI);

  const deleteUser = () =>
    fetch(`/users/${userId}`, { method: "DELETE" }).then(async (res) => {
      const data = await res.json();
      setUserData(null);
      setLog(data.message);
    });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>HTTP Methods Playground</h1>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />

      <div style={{ margin: "10px 0", display: "flex", gap: "10px" }}>
        <button onClick={getUser} style={{ background: "#e1e1e1" }}>
          GET (조회/Search)
        </button>
        <button onClick={createUser} style={{ background: "#d1ffd1" }}>
          POST (생성/Creation)
        </button>
        <button onClick={patchUser} style={{ background: "#fff4d1" }}>
          PATCH (일부수정/Partial modification)
        </button>
        <button onClick={putUser} style={{ background: "#ffd1d1" }}>
          PUT (전체교체/Complete replacement)
        </button>
        <button onClick={deleteUser} style={{ background: "#eee" }}>
          DELETE (삭제/Deletion)
        </button>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <section>
          <h3>현재 데이터 상세 / State </h3>
          {userData ? (
            <div style={{ border: "1px solid blue", padding: "10px" }}>
              <p>ID: {userData.id}</p>
              <p>이름/Name: {userData.name || "없음/none"}</p>
              <p>나이/Age: {userData.age || "없음/none"}</p>
              <p>닉네임/NickName: {userData.nickname || "없음/none"}</p>
            </div>
          ) : (
            <p>조회된 데이터가 없습니다./No data was retrieved.</p>
          )}
        </section>
        <section>
          <h3>서버 원본 응답 / Server Response(Raw JSON) </h3>
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>{log}</pre>
        </section>
      </div>
    </div>
  );
}

export default UserComponent;
