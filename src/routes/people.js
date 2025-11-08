const express = require("express");
const router = express.Router();

// Datos simulados en memoria
let persons = [
  { id: 1, name: "Alice", email: "alice@correo.com", role: "Dev" },
  { id: 2, name: "Bob", email: "bob@correo.com", role: "QA" },
];

let nextId = 3;

// GET /persons → Lista todas las personas
router.get("/", (req, res) => {
  res.json(persons);
});

// GET /persons/:id → Obtiene una persona
router.get("/:id", (req, res) => {
  const person = persons.find(p => p.id == req.params.id);
  if (!person) return res.status(404).json({ message: "Persona no encontrada" });
  res.json(person);
});

// POST /persons → Crea una persona
router.post("/", (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role)
    return res.status(400).json({ message: "Todos los campos son requeridos" });

  const newPerson = { id: nextId++, name, email, role };
  persons.push(newPerson);
  res.status(201).json({ message: "Persona creada", person: newPerson });
});

// PUT /persons/:id → Actualiza una persona
router.put("/:id", (req, res) => {
  const person = persons.find(p => p.id == req.params.id);
  if (!person) return res.status(404).json({ message: "Persona no encontrada" });

  const { name, email, role } = req.body;
  if (role) person.role = role;

  res.json({ message: "Persona actualizada", person });
});

// DELETE /persons/:id → Elimina una persona
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.json({ message: "Persona eliminada" });
});

module.exports = router;
