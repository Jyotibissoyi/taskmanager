const { pgConnect } = require("../config/dbConnection");

// Create a task
const createTask = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        const finalDueDate = due_date || new Date();
        console.log(finalDueDate);
        

        const client = await pgConnect()
        
        const newTask = await client.query(
            "INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *",
            [title, description, finalDueDate]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Helper function to determine task status
const getStatus = (due_date, completed_at) => {
        const dueDate = new Date(due_date)
        const today =  new Date()//moment().format("YYYY-MM-DD");
        if (completed_at) return "Completed";
        if (dueDate < today) return "Overdue";
        if (dueDate === today) return "Due Today";
        return "Pending";
};


module.exports = {createTask, fetchTask};
