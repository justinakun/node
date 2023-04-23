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
    users.push(user);
    res.send(user);
})

app.post("/login", (req, res) => {

    let foundUser = users.find((user) => user.email === req.body.email);

    if (foundUser !== undefined) {

      let submittedPassword = req.body.password; 
      let storedPassword = foundUser.password; 

      if (submittedPassword === storedPassword) {
        res.send({ message: "Sėkmingai prisijungėte", approved: true });
      } else {
        res.send({ message: "Neteisingas slaptažodis", approved: false });
      }
    } else {

      res.send({
        message: "Neteisingas el. paštas",
        approved: false,
      });
    }
  });

app.listen(port, () =>{
    console.log(`Server is running on the ${port}`);
});