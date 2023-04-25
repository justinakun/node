// Duomenys: https://pastebin.com/M3FQdwqf

// 1. Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.

// 2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos, 
// bei grąžins Sk tuos produktus, kurie priklauso šiai kategorijai.

// 3. Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins aSSnkamą 
// prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės 
// konvertuoS.

// 4. Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas: 
// ["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH1000XM4", "Bose QuietComfort 35 II"]).

// 5. Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra 
// mažesnis už nurodytą kiekį, pavadinimus ir likug (formatas: [{"name": "Samsung 
// Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}])

// 6 Sukurkite dinaminį GET route, kuris pagal kainos intervalą grąžins prekes, kurių kaina 
// yra tarp nurodytų ribų (įskaitant jas). Parametrai turėtų būD perduodami URL kaip 
// minPrice ir maxPrice. (du parametrai reikalingi)

// 7 Sukurkite POST route, kuris leis pridėD naują prekę prie duomenų sąrašo. Nauja prekė 
// turėtų turėD id, name, category, price ir stock laukus. UžDkrinkite, kad naujoji prekė 
// neturėtų to paDes id kaip jau esančios prekės
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

//6
app.get("/goods/:minPrice/:maxPrice", (req, res)=>{
    const minPrice = req.params.minPrice;
    const maxPrice = req.params.maxPrice;
    
    const productByPrice = data.filter(item=> item.price >= +minPrice && item.price <= +maxPrice)
    console.log(productByPrice);
})

//7
app.post("/new", (req, res)=>{
    const newItem = req.body;
    const newItemId = newItem.id;

    const takenId = data.some(item=> item.id === newItemId);
    if(!takenId){
        //add the new item
        data.push(newItem);
        res.send(req.body);
    } else {
        res.send(`An identical ID already exists`)
    }
})


app.listen(port, () => console.log(`Server started on port ${port}...`));