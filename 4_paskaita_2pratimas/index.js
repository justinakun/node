const express = require("express");
const cors = require("cors");
const data = require("./data"); //importuojam duomenis
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

//1
app.get("/", (req, res)=>{
    res.send(data);
})

//2
app.get("/categories/:category", (req, res)=>{
    const category = req.params.category;
    const filteredCategory = data.filter(gadget => gadget.category.toLocaleLowerCase() === category.toLocaleLowerCase());
    res.send(filteredCategory);
})

//3
app.get("/products/:id", (req, res)=>{
    const id = req.params.id;
    const foundProduct = data.find(product => product.id === +id);
    res.send(foundProduct);
})

//4
app.get("/things", (req, res)=>{
    const allProducts = data.map(product => product.name);
    res.send(allProducts);
})

//5
app.get("/stock/:amount", (req, res)=>{
    const amount = req.params.amount;
    const inStock = data.filter(item=> item.stock < amount)

    const nameAndStock = inStock.map(item =>({name: item.name, stock: item.stock}))
    res.send(nameAndStock);
})

app.listen(port, () => console.log(`Server started on port ${port}...`));