const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const cars = {
    bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
    mb: ["A class", "C class", "E class", "S class"],
    vw: ["Golf", "Arteon", "UP"]
}

    //yra lygus(abi eilutes daro ta pati)
    // console.log(cars.bmw);
    // console.log(cars['bmw']);

app.get("/bmw", (req, res) => {
    res.send(["i3", "i8", "1 series", "3 series", "5 series"]);
});

app.get("/audi", (req, res) => {
    res.send(["A4", "A5", "A6"]);
});

//dinaminis linkas tas, kuris prasideda su : (dvitaskiu)
app.get("/cars/:model", (req, res) =>{
    //req.params - requesto parametrai
    //jeigu norime pasiekti dinamini linka, turime naudoti toki pati pavadinima pvz :model butu req.params.model
    const model = req.params.model;

    //dinamiskai istraukti duomenys
    res.send(cars[model]);
})

app.listen(port, () => console.log(`Server started on port ${port}...`));