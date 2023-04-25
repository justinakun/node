const express = require("express");
const cors = require("cors");
const port = 3000;


const app = express();
app.use(express.json());
app.use(cors());


const cart = [{id: 1, name:"potatoes", price: 5, quantity: 2}];

//return the whole shopping cart
app.get("/", (req, res) => {
    res.send(cart);
});

//add an item to the cart
app.post("/", (req, res)=>{
    const item = req.body;
    cart.push(item);
    res.send(item);
})

//return one item from the cart
app.get("/cart/item/:id", (req, res)=>{
    const id = req.params.id;
    const itemById = cart.find(item=> item.id === +id)
    res.send(itemById);
})

app.listen(port, () => console.log(`Server started on port ${port}...`));