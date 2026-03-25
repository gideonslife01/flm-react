const express = require("express");
const cors = require("cors");
const users = require("./users");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// 로그인 / Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 가짜 토큰 생성 / create fake token
  const token = "fake-token-" + user.id;

  res.json({ token });
});

// 토큰 확인용 보호 API / Protection API for token verification
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token.startsWith("fake-token-")) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const userId = token.split("-")[2];
  const user = users.find((u) => u.id == userId);

  res.json({ id: user.id, username: user.username });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
