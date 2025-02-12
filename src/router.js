const express = require("express");
const router = express.Router();
const { createTask, fetchTask, updateTask, completeTask, deleteTask, fetchByTitle} = require("./controller")

router.post("/tasks", createTask);
router.get("/tasks", fetchTask);
router.put("/tasks/:id", updateTask);
router.put("/tasks/:id/complete", completeTask);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks/search", fetchByTitle);


module.exports = router;