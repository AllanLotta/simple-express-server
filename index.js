const express = require("express");

const server = express();

server.use(express.json()); //para definir o formato json

server.get('/projects', (req, res) => {
  return res.send('Server works!');
})


server.listen(3000);