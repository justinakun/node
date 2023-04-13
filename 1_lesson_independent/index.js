const express = require("express"); 
const app = express(); 
const port = 3000; 

const casual = require("casual");

app.get("/randomUser", (req, res) => {
    const user = {
        name: `${casual.first_name}`,
        surname: `${casual.last_name}`,
        country: `${casual.country}`,
        street: `${casual.street}`,
        zip: `${casual.zip(digits = 5)}`,
    }
    res.send(user); 
});

app.get("/randomColor", (req, res) => {
    res.send(`${casual.safe_color_name}`);
})

app.get("/randomColors", (req, res) => {
    const colorArray = [];
    for (let i = 0; i < 5; i++){
        colorArray.push(casual.safe_color_name);
    }
    res.send(colorArray);
}) 

app.get("/randomPlaces", (req, res) => {
    let randomNumber = casual.integer(from = 1, to = 5);
    let myObjectArray = [];
    for(let i = 0; i < randomNumber; i++){
        myObjectArray[i] = {
        country: `${casual.country}`,
        city: `${casual.city}`,
        address: `${casual.address}`
        }
    }
    res.send(myObjectArray);
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
