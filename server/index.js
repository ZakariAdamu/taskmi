const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const tasksRoute = require("./routes/tasksRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", tasksRoute);

app.use(errorHandler);

// Server/backend setup
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server running on port ${port} shukran!`));
