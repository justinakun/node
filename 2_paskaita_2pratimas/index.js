const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000;

app.use(express.json());
app.use(cors());

const products = ["apple"];

app.get("/products", (req, res) => {
    res.send(products);
}) 

app.post("/products", (req, res) =>{
    const product = req.body.userInput;
    products.push(product);
    res.send(req.body);
})

app.listen(port, () =>{
    console.log(`Server is running on the ${port}`);
});