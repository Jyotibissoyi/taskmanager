const { pgConnect } = require("../config/dbConnection");
// Create a task
const createTask = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;

        if (!title || !description || !due_date) {
            return res.status(400).json({
                status: false,
                error: "Please provide title, description, and due_date in body."
            });
        };
        const finalDueDate = due_date || new Date();

        const client = await pgConnect();

        const newTask = await client.query(
            "INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *",
            [title, description, finalDueDate]
        );
        return res.status(201).json({
            status: true,
            message: "Task created Successfully.",
            data: newTask.rows[0]
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get all tasks
const fetchTask = async (req, res) => {
    try {
        const client = await pgConnect()
        const tasks = await client.query("SELECT * FROM tasks");
        const result = tasks.rows.map(task => ({
            ...task,
            status: getStatus(task.due_date, task.completed_at)
        }));
        return res.status(200).json({
            status: true,
            message: "Task fetch successfully.",
            data: result
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
// Helper function to determine task status
const getStatus = (due_date, completed_at) => {
    const dueDate = new Date(due_date)
    const today = new Date()//moment().format("YYYY-MM-DD");
    if (completed_at) return "Completed";
    if (dueDate < today) return "Overdue";
    if (dueDate === today) return "Due Today";
    return "Pending";
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const client = await pgConnect()
        const { id } = req.params;
        const { title, description, due_date } = req.body;
        if (!id) {
            return res.status(400).json({
                status: false,
                error: "Please provide taskId(id) in params."
            });
        };
        if (!title || !description || !due_date) {
            return res.status(400).json({
                status: false,
                error: "Please provide title, description, and due_date in body."
            });
        };
        const oldTask = await client.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (oldTask.rows.length === 0) {
            return res.status(404).json({
                status: false,
                error: "Task not found"
            });
        };
        const updatedTask = await client.query(
            "UPDATE tasks SET title = $1, description = $2, due_date = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
            [title || oldTask.rows[0].title, description || oldTask.rows[0].description, due_date || oldTask.rows[0].due_date, id]
        );
        return res.status(200).json({
            status: true,
            message: "Task modified Successfully",
            updatedTask: updatedTask.rows[0], previousValues: oldTask.rows[0]
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
// Mark task as completed
const completeTask = async (req, res) => {
    try {
        const client = await pgConnect();
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                error: "Please provide taskId(id) in params."
            });
        };
        const updatedTask = await client.query(
            "UPDATE tasks SET status = 'Completed', completed_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
            [id]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({
                status: false,
                error: "Task not found"
            });
        };
        return res.status(200).json({
            status: true,
            message: "Task marked as completed.",
            task: updatedTask.rows[0]
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const client = await pgConnect()
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                error: "Please provide taskId(id) in params."
            });
        };
        const deletedTask = await client.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
        if (deletedTask.rows.length === 0) return res.status(404).json({
            status: false,
            error: "Task not found"
        });
        return res.status(200).json({
            status: true,
            message: "Task deleted successfully.",
            data: deletedTask.rows[0]
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Search tasks
const fetchByTitle = async (req, res) => {
    try {
        const client = await pgConnect()
        const {  } = req.query;

        const tasks = await client.query(
            "SELECT * FROM tasks WHERE title ILIKE $1 ",
            [`%${q}%`]
        );
       return res.status(200).json({
        status : true,
        message :"Fetch task successfully.",
        tasks :tasks.rows});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createTask, fetchTask, updateTask, deleteTask, completeTask, fetchByTitle }