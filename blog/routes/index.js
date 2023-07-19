var express = require("express");
const pool = require("../db/db");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const post = await pool.query("SELECT * FROM post;");
  // console.log(posts[0]); // 데이터베이스에서 인증값이라 그런것들이 같이 와서 0번을 많이 붙여서 보내본다.
  // 찾는다 SELECT , 모든것을 가져온다 SELECT * , from (어디서) 변수는 소문자, 명령어는 대문자로 구분해서 편하게..
  res.render("index", { title: "blog", post: post[0] }); // 딕셔너리처럼 key , value 똑같은 구조
});

// router.get("/post", function (req, res, next) {
//   res.render("post", { title: "kangmin" });
// });

module.exports = router;
