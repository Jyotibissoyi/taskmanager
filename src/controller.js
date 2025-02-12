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

module.exports = {createTask};
