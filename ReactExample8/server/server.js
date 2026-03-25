const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

// 서버와 요청하는 곳의 포트가 다르면 cors에러 발생함.
// 포트가 다르면 브라우저는 다른 출처(origin) 로 판단함.
// 브라우저 보안정책상 프로토콜,도메인,포트번호중 하나라도 틀리면 막음.
// If the port of the server and the requesting party are different, a CORS error occurs.
// If the ports are different, the browser considers them to be from different origins.
// According to browser security policy, if any of the protocol, domain, or port number is different, the request is blocked.
app.use(cors());
app.use(express.json());

// 가상의 데이터베이스 / Virtual Database
let users = [{ id: "1", name: "V", age: 20, nickname: "Cyberpunk2077" }];

// GET: 특정 유저 조회 / Specific user inquiry
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  user
    ? res.json(user)
    : res.status(404).json({ message: "유저 없음/No user" });
});

// POST: 새로운 유저 생성 / Create new user
app.post("/users", (req, res) => {
  const newUser = { id: String(users.length + 1), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser); // 201 성공메세지,404는 실패메세지
});
/*
...req.body =>전개연산자 body를 복제함.
const newUser = {
  id: "3",            // (2 + 1)을 문자열로 변환
  name: "Jay",        // ...req.body에서 복사됨
  age: 25             // ...req.body에서 복사됨
};
*/

// PATCH: 데이터의 '일부'만 수정 (기존 데이터 유지)
// Modify only 'part' of the data (keep existing data)
app.patch("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index !== -1) {
    // 기존 값 + 바뀐 값 합치기 / Merge existing value + changed value
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    // 검색실패 -1
    res.status(404).json({ message: "유저 없음/No user" });
  }
});

// PUT: 데이터 '전체'를 교체 (보내지 않은 필드는 사라짐)
// Replace 'all' data (unsent fields disappear)
app.put("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index !== -1) {
    // 기존 내용 무시하고 덮어쓰기 / Ignore existing content and overwrite
    users[index] = { id: req.params.id, ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "유저 없음/No user" });
  }
});

// DELETE: 데이터 삭제 / data deletion
app.delete("/users/:id", (req, res) => {
  // 기존users 배열에서 요청된 아이디와 다른 것만  usesr배열에 포함시켜라
  users = users.filter((u) => u.id !== req.params.id);
  res.json({ message: `User ${req.params.id} 삭제 완료 / Deletion complete` });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));

/*
상태 코드,분류,주요 의미,비유
200,Success,OK (일반적인 성공),"""알겠어, 여기 있어."""
201,Success,Created (생성 성공),"""주문하신 물건 방금 다 만들었어요!"""
400,Client Error,Bad Request (잘못된 요청),"""주문을 이상하게 하셨는데요?"""
404,Client Error,Not Found (찾지 못함),"""그런 물건은 저희 가게에 없어요."""
500,Server Error,Internal Server Error,"""죄송해요, 저희 직원이 실수했어요."""
*/
