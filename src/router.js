const express = require("express");
const router = express.Router();
const { createTask, fetchTask, updateTask, completeTask} = require("./controller")

router.post("/tasks", createTask);
router.get("/tasks", fetchTask);
router.put("/tasks/:id", updateTask);
router.put("/tasks/:id/complete", completeTask);


module.exports = router;