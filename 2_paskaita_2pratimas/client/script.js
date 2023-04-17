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

    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", //priimines duomenis json formatu
        },
        body: JSON.stringify({newObject}),
    }).then(() => {
        location.reload();
    })   
});