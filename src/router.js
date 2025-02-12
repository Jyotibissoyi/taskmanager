const express = require("express");
const router = express.Router();
const { createTask} = require("./controller")

router.post("/tasks", createTask);


module.exports = router;