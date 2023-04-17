fetch("http://localhost:3000/products")
    .then((resp) => resp.json())
    .then((response) => {
        const productList = document.querySelector('#allProducts');
        response.forEach((product) => {
            const li = document.createElement('li');
            li.textContent = product;
            productList.append(li);
        });
    })

document.querySelector('#addItems').addEventListener('click', () =>{
    const userInput = document.querySelector('#usersInput').value;
    console.log(userInput);

    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", //priimines duomenis json formatu
        },
        body: JSON.stringify({userInput}),
    }).then(() => {
        location.reload();
    })   
});