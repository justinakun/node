const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000;

app.use(express.json());
app.use(cors());

const products = [{name: "apple", price: 2}];

app.get("/products", (req, res) => {
    res.send(products);
}) 

app.post("/products", (req, res) =>{
    const product = req.body.newObject;
    products.push(product);
    res.send(product);
})

app.listen(port, () =>{
    console.log(`Server is running on the ${port}`);
});