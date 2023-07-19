var express = require("express");
var router = express.Router();
const pool = require("../db/db");
/**
 *
 * Read
 */
router.get("/", async (req, res, next) => {
  const post = await pool.query("SELECT * from post");

  res.render("post", { title: "Node.js" });
});

router.post("/", async (req, res, next) => {
  res.render("post");
});

/**
 *
 * Create
 */
router.get("create", async (req, res, next) => {
  res.render("post");
});

router.post("/create", async (req, res, next) => {
  const { posttitle, postvalue } = req.body;
  const uid = "kkk"; // 작성자 pwriter
  // const now = new date();
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  const wdate = year + "-" + month + "-" + date;
  const createPost = await pool.query(
    "INSERT INTO post values(null, ?, ?, ?, ?, null)",
    [posttitle, postvalue, wdate, uid]
  );
  // console.log([posttitle, postvalue, wdate, uid]);

  res.redirect("/");
});
/**
 *
 * Delete
 */
router.get("/del/:target", async (req, res, next) => {
  const target = req.params.target;
  const delpost = await pool.query("DELETE from post where pid = ?", [target]);

  res.redirect("/");
});
/**
 *
 * Update
 */
router.post("/updatepage/:target", async (req, res, next) => {
  const pid = req.body.pid;
  const post = await pool.query("SELECT * FROM post where pid = ?", [pid]);
  console.log(post[0]);
  // console.log(req.body.pid);
  res.render("postupdate", {
    title: "blog",
    post: post[0],
    pid: req.body.pid,
  });
});

router.post("/update", async (req, res, next) => {
  var pid = req.body.pid;
  var ptitle = req.body.posttitle;
  var pvalue = req.body.postvalue;
  console.log(pid);
  // const { posttitle, postvalue } = req.body;
  // const { pid } = req.id;

  const update_post = await pool.query(
    "UPDATE post set ptitle = ?, pvalue=? where pid=? ;",
    [ptitle, pvalue, pid]
  );
  // post[0][1].pid 앞에 post 정의 해서 await 걸어주면 데이터 가져온다.
  // console.log([pid]);
  // res.send(req.id);
  res.redirect("/");
});

/**
 *
 * Search
 */
router.post("/search", async (req, res) => {
  const { key } = req.body;
  console.log(key);
  const search = await pool.query("SELECT * FROM post WHERE ptitle LIKE ?", [
    "%" + key + "%",
  ]);
  if (key.length === 0) {
    return res.send(`<script type="text/javascript">
    alert("검색어를 입력해주세요."); 
    location.href='/';
    </script>`);
  } else {
    return res.render("postsearch", { title: "blog", post: search[0] });
  }
  console.log(search[0]);
  // const post = await pool.query("SELECT * from post");
  // res.render("postsearch", { title: "blog", post: search[0] });
});

module.exports = router;
