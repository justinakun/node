// Dazniausiai naudojamos aplinkos: DEVELOPMENT (pas mus),
// TESTING, PREPROD (versija pries galutine),
// PRODUCTION (galutine versija kuria mato visi klientai)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;
// process.env - objektas sukurtas is musu .env failo
// || 8080 - griztamas rysys jeigu PORT bus nerastas(apsidraudimui)

const app = express();
app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//   res.send(cart);
// });

app.listen(port, () => console.log(`Server started on port ${port}...`));
