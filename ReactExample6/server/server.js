const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "gimdaegyeong", // 본인의 계정명
  host: "localhost",
  database: "postgres", // 본인의 DB명
  password: "", // 본인의 비밀번호
  port: 5432,
});

// 현재 상태 가져오기
app.get("/status", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT is_active FROM button_status WHERE id = 1",
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 상태 업데이트하기
app.post("/toggle", async (req, res) => {
  const { isActive } = req.body;
  try {
    const result = await pool.query(
      "UPDATE button_status SET is_active = $1 WHERE id = 1 RETURNING *",
      [isActive],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
