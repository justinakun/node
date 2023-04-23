const form = document.querySelector('form');

form.addEventListener('submit', event =>{
    event.preventDefault();

    const email = document.querySelector('#emailAddress').value;
    const password = document.querySelector('#loginPassword').value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
        .then((response) => response.json())
        .then((data) => {
        const output = document.querySelector("h2");

        if (data.approved === false) {
            output.style.color = "red";
        } else {
            output.style.color = "green";
        }

        output.textContent = data.message;
        })
        .catch((error) => console.log(error));
        form.reset();
});