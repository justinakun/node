const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const tickets = [];

// 1st task - GET /&ckets – grąžins visus nupirktus bilietus
app.get('/tickets', (req, res) => {
  res.send(tickets);
});

// 2nd task - POST /&ckets – pridės bilietą
app.post('/tickets', (req, res) => {
  const ticket = req.body;
  ticket.id = tickets.length + 1;
  tickets.push(ticket);
  res.status(201).send(ticket);
});

// 3rd task - GET /&ckets/:id – grąžins vieną bilietą
app.get('/tickets/:id', (req, res) => {
  const id = +req.params.id;
  const foundTicket = tickets.find((item) => item.id === id);
  if (!foundTicket) {
    res.status(404).send('A ticket with this ID does not exist');
  } else {
    res.send(foundTicket);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
