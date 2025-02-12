const express = require("express");
const router = express.Router();
const { createTask, fetchTask} = require("./controller")

router.post("/tasks", createTask);
router.get("/tasks", fetchTask);


module.exports = router;