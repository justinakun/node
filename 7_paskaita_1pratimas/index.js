const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];

app.get('/posts/', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const post = req.body;
  posts.push(post);
  res.send(posts);
});

app.get('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const findPost = posts.find((item) => item.id === id);
  if (!findPost) {
    res.status(404).send({ message: 'This ID is not found' });
  } else {
    res.send(findPost);
  }
});

app.put('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const findIndex = posts.findIndex((item) => item.id === id);
  if (findIndex !== -1) {
    const newPost = req.body;
    const updatedPost = { id, ...newPost };
    posts.splice(findIndex, 1, updatedPost);
    res.send(updatedPost);
  } else {
    res.status(404).send({ message: 'This ID does not exist' });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const findIndex = posts.findIndex((item) => item.id === id);
  if (findIndex !== -1) {
    const deletingPost = posts.find((item) => item.id === id);
    posts.splice(findIndex, 1);
    res.send(deletingPost);
  } else {
    res.status(404).send({ message: 'This ID is not found' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
