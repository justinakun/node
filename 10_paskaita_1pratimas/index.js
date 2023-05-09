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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .countDocuments();
    await con.close();
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
    // Justina: bandziau be rakto, grazinti tik DATA viduje {},
    // ir gaunasi viskas irgi gerai, tik key tada ir yra DATA
    // o Roko variante key tampa COUNT
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersCount/Jonas', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .countDocuments({ name: { $regex: /Jonas/ } });
    await con.close();
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .distinct('city'); // grąžina unikalias reikšmes, būtinai reikia nurodyti kriterijų t.y. raktą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/lowestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .aggregate([{ $sort: { income: -1 } }])
      .toArray();
    // $group - sugrupuoja, _id: $name - naudoja unikalų customerį,
    // income: { $sum: '$income' } - income raktas su suma kurią sudeda iš $income lauko
    // $sort: { income: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: income
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .aggregate([{ $sort: { income: 1 } }])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/dynamicUsersCount/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .countDocuments({ name: { $regex: new RegExp(name) } });
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .insertMany([
        {
          name: 'Giedrius Vaitkus',
          email: 'giedrius.vaitkus@example.com',
          city: 'Kaunas',
          income: 5200,
        },
        {
          name: 'Lina Petrauskaitė',
          email: 'lina.petrauskaite@example.com',
          city: 'Vilnius',
          income: 6100,
        },
        {
          name: 'Eglė Kazlauskaitė',
          email: 'egle.kazlauskaite@example.com',
          city: 'Šiauliai',
          income: 4700,
        },
        {
          name: 'Jonas Petrauskas',
          email: 'jonas.petrauskas@example.com',
          city: 'Kaunas',
          income: 5900,
        },
        {
          name: 'Tomas Jankauskas',
          email: 'tomas.jankauskas@example.com',
          city: 'Klaipėda',
          income: 6900,
        },
        {
          name: 'Marius Jonaitis',
          email: 'marius.jonaitis@example.com',
          city: 'Vilnius',
          income: 5100,
        },
        {
          name: 'Ieva Kazlauskaitė',
          email: 'ieva.kazlauskaite@example.com',
          city: 'Kaunas',
          income: 5600,
        },
        {
          name: 'Rokas Balčiūnas',
          email: 'rokas.balciunas@example.com',
          city: 'Vilnius',
          income: 7400,
        },
        {
          name: 'Jonas Jankauskas',
          email: 'jonas.jankauskas@example.com',
          city: 'Klaipėda',
          income: 4800,
        },
        {
          name: 'Laura Kavaliauskaitė',
          email: 'laura.kavaliauskaite@example.com',
          city: 'Šiauliai',
          income: 5800,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
