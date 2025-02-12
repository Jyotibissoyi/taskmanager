const express = require("express");
require("dotenv").config();
const route = require("./src/router");
const { dbConnection } = require("./config/dbConnection");

const app = express();

app.use(express.json());

dbConnection().then(() => { })

app.use("/", route);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});
