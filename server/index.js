const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const tasksRoute = require("./routes/tasksRoutes");
const userRoute = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors()); // Basic CORS setup - allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup
app.use("/api/tasks", tasksRoute);
app.use("/api/users", userRoute);

// Home route for initial testing
app.get("/", (req, res) => {
	res.send("Hello from Node TaskMi API, AlhamdulilLah x3");
});

app.use(errorHandler);

// Server/backend setup
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server running at http://localhost:${port} shukran!`));
