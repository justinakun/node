const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000;

app.use(express.json());
app.use(cors());

const users=[{
    name: "Justina", 
    surname: "Kunigonyte",
    address: "Happy Valley 123",
    zip: "987654",
    city: "Old York",
    phone: "+37012345678",
    email: "happyvalley@happyvalley.com",
    agree: false,
    password: "NoneOfYourBusiness"
}];

app.get("/users", (req, res) => {
    res.send(users);
}) 

app.post("/users", (req, res) =>{
    const user = req.body.user;
    console.log(user);
    users.push(user);
    res.send(user);
})


app.listen(port, () =>{
    console.log(`Server is running on the ${port}`);
});