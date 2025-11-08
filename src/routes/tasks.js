const express = require("express");
const router = express.Router();

// Datos simulados en memoria
let tasks = [
  { id: 1, title: "Primera tarea", description: "Hacer la tarea de programación", status: "pending" },
  { id: 2, title: "Segunda tarea", description: "Leer documentación", status: "done" },
  { id: 3, title: "Tercera tarea", description: "Subir video", status: "pending" },
];

let nextId = 4;

// POST /tasks → Crear nueva tarea
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newTask = { id: nextId++, title, description, status: "pending" };
  tasks.push(newTask);
  res.status(201).json({ message: "Task created", task: newTask });
});

// GET /tasks → Listar todas las tareas
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id → Obtener una tarea por ID
router.get("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// PUT /tasks/:id → Actualizar una tarea
router.put("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const { title, description, status } = req.body;

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  res.json({ message: "Task updated successfully", task });
});

// DELETE /tasks/:id → Eliminar una tarea
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;
