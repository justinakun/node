const express = require("express"); //express importas
const cors = require("cors"); //cors importas
const app = express(); //express aplikacijos inicijavimas
const port = 3000; //kanalas reikalingas serveriui

app.use(express.json()); //aplikacija priima duomenis JSON formatu
app.use(cors()); //aplikacija naudoja CORS apsauga

const cars = [];

//GET kelias, kuris grazina duomenis
app.get("/", (req, res) => {
    //res (response) - duomenys kuriuos mes grazinam
    res.send(cars);
}) 

app.post("/", (req, res) =>{
    //req(request) - duomenys kuriuos mes gaunam is isores
    //req.body - pagrindiniai duomenys is isores
    const car = req.body.car;
    cars.push(car);
    res.send(req.body); //POST dalyje siunciam atgal klientui, tai ka jis pats atsiunte mum
})

//app.listen() - metodas kuris paleidzia klausytis musu serverio nurodytu kanalu
// port - kanalas
//() => {} - funkcija kuris pasileidzia kai serveris startuoja
//console.log naudojam, kad zinoti kokiu kanalu paleido serveri
app.listen(port, () =>{
    console.log(`Server is running on the http://localhost:${port}/`);
});