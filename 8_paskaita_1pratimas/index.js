const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('8pamoka_1pratimas')
      .collection('Restaurants')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const restaurant = req.body;
    const con = await client.connect();
    const data = await con
      .db('8pamoka_1pratimas')
      .collection('Restaurants')
      .insertOne(restaurant);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
