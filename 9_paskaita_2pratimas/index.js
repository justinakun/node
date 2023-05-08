const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .findOne(new ObjectId(id));
    await con.close();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/products/category/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .find({ category: type })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/products/priceSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .find()
      .sort({ price: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .insertOne(product);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
