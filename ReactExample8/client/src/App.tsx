import React, { useState } from "react";
import axios from "axios";

function UserComponent() {
  const [userId, setUserId] = useState("1");
  const [userData, setUserData] = useState(null);
  const [log, setLog] = useState("");

  // vite.config.ts 대신 설정 할 수 있음.
  // 대신에 cors에러가 발생할 수 있으니 반드시 서버쪽에 cors모듈 설치 할 것
  // You can set it instead of vite.config.ts. 
  // Instead, you must install the cors module on the server side to avoid a cors error.
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const handleResponse = (res) => {
    setUserData(res.data || null);
    setLog(JSON.stringify(res.data, null, 2));
  };

  const handleError = (err) => {
    const data = err.response?.data || { message: "Error occurred" };
    setUserData(null);
    setLog(JSON.stringify(data, null, 2));
  };

  const getUser = () =>
    api.get(`/users/${userId}`).then(handleResponse).catch(handleError);

  const createUser = () =>
    api
      .post("/users", {
        name: "NewUser",
        age: 30,
        nickname: "SilverHand",
      })
      .then(handleResponse)
      .catch(handleError);

  const patchUser = () =>
    api
      .patch(`/users/${userId}`, {
        nickname: "Johnny",
      })
      .then(handleResponse)
      .catch(handleError);

  const putUser = () =>
    api
      .put(`/users/${userId}`, {
        name: "John",
        age: 25,
      })
      .then(handleResponse)
      .catch(handleError);

  const deleteUser = () =>
    api
      .delete(`/users/${userId}`)
      .then((res) => {
        setUserData(null);
        setLog(res.data.message);
      })
      .catch(handleError);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>HTTP Methods Playground</h1>

      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />

      <div style={{ margin: "10px 0", display: "flex", gap: "10px" }}>
        <button onClick={getUser}>GET</button>
        <button onClick={createUser}>POST</button>
        <button onClick={patchUser}>PATCH</button>
        <button onClick={putUser}>PUT</button>
        <button onClick={deleteUser}>DELETE</button>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <section>
          <h3>현재 데이터 상세/Current data details</h3>
          {userData ? (
            <div style={{ border: "1px solid blue", padding: "10px" }}>
              <p>ID: {userData.id}</p>
              <p>이름/Name: {userData.name || "없음"}</p>
              <p>나이/Age: {userData.age || "없음"}</p>
              <p>닉네임/NickName: {userData.nickname || "없음"}</p>
            </div>
          ) : (
            <p>조회된 데이터가 없습니다./Detailed search of current data.</p>
          )}
        </section>

        <section>
          <h3>서버응답/Server response</h3>
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>{log}</pre>
        </section>
      </div>
    </div>
  );
}

export default UserComponent;
