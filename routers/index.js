const router = require("express").Router();

// addd locked Token
router.get("/", (req, res) => {
  res.status(200).json({ msg: "bunotech backend working successfully" });
});

module.exports = router;
