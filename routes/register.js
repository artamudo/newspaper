var express = require("express");
var router = express.Router();
const db = require("../database.js");

router.use(express.json());
router.use(express.urlencoded({extended: false})); 
const urlencodedParser = express.urlencoded({extended: false});

router.get("/", function (req, res, next) {
  res.render("register", { title: "Register | Newspaper" });
});

router.post("/", urlencodedParser, function (req, res) {
  var data = [req.body.name, req.body.email, req.body.password];
  var sql = "INSERT INTO user (name, email, password, failed_logins) VALUES (?,?,?,0)";
    db.run(sql, data, function (err, result) {
    if (err) {
      res.status(400);
      res.send("database error:" + err.message);
      return;
    }
    res.render("index", {
      activePage: "register",
      formData: req.body,
      title: "Login | Newspaper"
    });
  });
});
module.exports = router;
