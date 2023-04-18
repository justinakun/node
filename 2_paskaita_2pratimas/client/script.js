fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((response) => {
        const productList = document.querySelector('#allProducts');
        response.forEach((product) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} ${product.price}€`;
            productList.append(li);
        });
    })

document.querySelector('#addItems').addEventListener('click', () =>{
    const name = document.querySelector('#usersInput').value;    
    const price = document.querySelector('#price').value;

    const newObject = {
        name: name,
        price: price
    }
    // prideti nauja produkta(duomeni) i serveri
    //fetch(serverio URL, papildomi parametrai) <- struktura
    //serverio URL - adresas olo serverio
    //papildomi parametrai - tai parametry objektas, kuris nusamo esybes apie musu kreipimasi
    //esybes: method, headers, body
    //method - kreipimosi metodas, gali buti pvz: "POST", "PUT", "DELETE", "GET"(default)
    //headers - objektas {...}, gali buti {"Content-Type: "aplication/json} - nurodo, kad siunciamo duomenys yra JSON formato
    //body - musu siunciami duomenys, reikia prideti JSON.stringify(data) tam, kad serveris suprastu siunciamus duomenis. Butinai turi buti JSON formato aka Javascript Object pvz: {name:"Rokas", surname: Andreikenas}
    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", //priimines duomenis json formatu
        },
        body: JSON.stringify({newObject}),
    })
        .then((resp) => resp.json())
        .then((response) => {
        console.log(response);
        });
        // .then() kai kvietimas ivykdytas, ivykdo .then() dali
        //.then(response) - response dalis, tai kas grizta is serverio is res.send()

        //perkrauti puslapi
        location.reload();
});