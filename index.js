const express = require("express");
const app = express();
app.use(express.json());

// importar routers
const tasksRouter = require("./src/routes/tasks");
const projectsRouter = require("./src/routes/projects");
const peopleRouter = require("./src/routes/people");

app.use("/tasks", tasksRouter);
app.use("/projects", projectsRouter);
app.use("/people", peopleRouter);

app.get("/", (req, res) => {
  res.send("Hello World desde Express!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
