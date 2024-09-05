const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const tasksRoute = require("./routes/tasksRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", tasksRoute);

app.use(errorHandler);

// Server/backend setup
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server running on port ${port} shukran!`));
