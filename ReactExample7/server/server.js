const express = require("express");
const app = express();
const PORT = 3000;

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
  res.status(201).json(newUser);
});

// PATCH: 데이터의 '일부'만 수정 (기존 데이터 유지)
// Modify only 'part' of the data (keep existing data)
app.patch("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index !== -1) {
    // 기존 값 + 바뀐 값 합치기 / Merge existing value + changed value
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
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
  users = users.filter((u) => u.id !== req.params.id);
  res.json({ message: `User ${req.params.id} 삭제 완료 / Deletion complete` });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
