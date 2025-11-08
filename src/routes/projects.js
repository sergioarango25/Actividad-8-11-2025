const express = require('express');
const router = express.Router();

let projects = [
  { id: 1, title: 'Primer proyecto', description: 'Hacer la tarea de programación', status: 'PENDING' },
  { id: 2, title: 'Segundo proyecto', description: 'Leer documentación', status: 'COMPLETED' },
  { id: 3, title: 'Tercer proyecto', description: 'Subir video', status: 'PENDING' }
];

let nextId = 4;

router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const newProject = { id: nextId++, title, description, status: 'PENDING' };
  projects.push(newProject);
  res.status(201).json(newProject);
});


router.get('/', (req, res) => {
  res.json(projects);
});


router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id == req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});


router.put('/:id', (req, res) => {
  const project = projects.find(p => p.id == req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const { title, description, status } = req.body;
  project.title = title || project.title;
  project.description = description || project.description;
  project.status = status || project.status;
  res.json(project);
});


router.delete('/:id', (req, res) => {
  projects = projects.filter(p => p.id != req.params.id);
  res.json({ message: 'Project deleted successfully' });
});

module.exports = router;
