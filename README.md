# Task Management System API

## 📌 Overview

This is a backend API for a Task Management System built with **Node.js**, **Express.js**, and **PostgreSQL**. It allows users to create, update, delete, and search tasks, as well as mark them as completed.

## 🚀 Setup and Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Jyotibissoyi/taskmanager.git
cd taskmanager
```

### 2️⃣ Install Dependencies

```sh
npm install OR npm i
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT = 5005
PGUSER = "postgres"
HOST = "postgres"
DATABASE = "postgres"
PASSWORD = "postgres"
PGPORT = 5432
```

### 4️⃣ Run Database Migrations

Ensure PostgreSQL is running, then execute:

### 5️⃣ Start the Server

```sh
npm start
```

The server will run on **http://localhost:5005**.

Express is running on port 5005
connected to postgres
check the above console in terminal.

---

## 📌 API Endpoints

### 1️⃣ Create a Task

**Endpoint:** `POST /tasks`
**Request Body:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs",
  "due_date": "2025-02-20"
}
```

**Response:**

```json
{
    "status": true,
     "message": "Task created Successfully.",
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs",
  "due_date": "2025-02-20",
  "status": "Pending",
  "created_at": "2025-02-12",
  "updated_at": "2025-02-12"
}
}
```

### 2️⃣ Get All Tasks

**Endpoint:** `GET /tasks`
**Response:**

```json
{
 "status": true,
"message": "Task fetch successfully.",
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "due_date": "2025-02-20",
    "status": "Pending"
  }
]
}
```

### 3️⃣ Update a Task

**Endpoint:** `PUT /tasks/{id}`
**Request Body:**

```json
{
  "title": "Buy groceries and veggies",
  "description": "Milk, Bread, Eggs, Carrots"
}
```

### 4️⃣ Mark a Task as Completed

**Endpoint:** `PUT /tasks/{id}/complete`
**Response:**

```json
{
    "status" : true,
    "message" :"Task marked as completed.",

    {
      "id": 1,
      "status": "Completed",
      "completed_at": "2025-02-12"
    }
}
```

### 5️⃣ Delete a Task

**Endpoint:** `DELETE /tasks/{id}`
**Response:**

```json
{
  "status": true,
  "message": "Task deleted successfully"
}
```

### 6️⃣ Search Tasks

**Endpoint:** `GET /tasks/search?searchText=groceries`
**Response:**

```json
{
    "status" : true,
    "message" :"Fetch task successfully.",
    [
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs"
  }
]}
```

---

## 🛠 Technologies Used

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Moment.js**
- **pg (PostgreSQL Client)**

## 📌 Run Command

To start the application, run:

```sh
npm start
```

The server will run on **port 3000**.

---

## 📝 Author

Developed by Jyoti Bissoyi.
