const express = require("express"); //express modulio importavimas
const app = express(); //aplikacijos sukurimas
const port = 3000; //porto (kanalo) skaicius

//route/path (kelias)
//get - grazink duomenis
app.get("/", (req, res) => {
    //req - request - tai kas ateina is isores. res - response - kas ateina is vidaus
    res.send("My name is Justina"); //send metodas issiuncia duomenis (atvaizduojami local host narsykleje)
});

app.get("/today", (req, res) =>{
    res.send(new Date().toDateString());
});

app.get("/user", (req, res) =>{
    const user = {
        name: "Justina", surname: "Kunigonyte", age: 31
    }
    res.send(user);
})

//serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
