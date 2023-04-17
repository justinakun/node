const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000;

app.use(express.json());
app.use(cors());

const cars = [];

app.get("/", (req, res) => {
    res.send(cars);
}) 

app.post("/cars", (req, res) =>{
    const carBrand = "Audi";
    cars.push(carBrand);
    res.send(cars);
})

app.listen(port, () =>{
    console.log(`Server is running on the ${port}`);
});