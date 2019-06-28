const express = require("express");

const server = express();

server.use(express.json()); //para definir o formato json

const projects = [
  {
    id: "1",
    title: "Projeto 1",
    tasks: ["tarefa 1", "tarefa 2"]
  },
  {
    id: "2",
    title: "Projeto 2",
    tasks: ["tarefa 1", "tarefa 2"]
  },
  {
    id: "3",
    title: "Projeto 3",
    tasks: ["tarefa 1", "tarefa 2"]
  }
];

server.use((req, res, next) => {
  console.log(`Method: ${req.method}; URL: ${req.url}`);
  next();
});

function checkIdOnArrayElements(req, res, next) {
  const { id } = req.params;
  var check;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      return next();
    }
  }
  return res.status(400).json({ error: "The project does not exists!" });
}
function checkTitle(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "The title is required" });
  }
  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkIdOnArrayElements, (req, res) => {
  const { id } = req.params;

  projects.forEach(element => {
    if (element.id == id) {
      return res.json(element);
    }
  });
});

server.post("/projects", checkTitle, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({ id: id, title: title, tasks: [] });

  return res.json(projects);
});

server.post(
  "/projects/:id/tasks",
  checkIdOnArrayElements,
  checkTitle,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects[i].tasks.push({ title });
      }
    }

    return res.json(projects);
  }
);

server.put("/projects/:id", checkIdOnArrayElements, checkTitle, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects[i].title = title;
    }
  }

  return res.json(projects);
});

server.delete("/projects/:id", checkIdOnArrayElements, (req, res) => {
  const { id } = req.params;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects.splice(i, 1);
    }
  }

  return res.send("Removido com sucesso!");
});
server.listen(3000);
