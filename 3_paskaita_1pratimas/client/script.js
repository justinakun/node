//displaying users
fetch("http://localhost:3000/users")
  .then((resp) => resp.json())
  .then((response) => {
    // const userList = document.querySelector("table");
    response.forEach((user) => {
      const tr = document.createElement("tr");
      const tdName = document.createElement('td');
      tdName.textContent = user.name;
      const tdSurname = document.createElement('td');
      tdSurname.textContent = user.surname;
      const tdAddress = document.createElement('td');
      tdAddress.textContent = user.address;
      const tdZip = document.createElement('td');
      tdZip.textContent = user.zip;
      const tdCity = document.createElement('td');
      tdCity.textContent = user.city;
      const tdPhone = document.createElement('td');
      tdPhone.textContent = user.phone;
      const tdEmail = document.createElement('td');
      tdEmail.textContent = user.email;

      tr.append(tdName, tdSurname, tdAddress, tdZip, tdCity, tdPhone, tdEmail);

      const table = document.querySelector('table');
      table.append(tr);
    });
  })

//adding new users
document.querySelector('form').addEventListener('submit', (event)=>{
    //get all values from the form
    event.preventDefault();
    const password = document.querySelector('#pass').value;
    const repeatPasswordInput = document.querySelector("#retypePass").value;

    if(password === repeatPasswordInput){
      const email = document.querySelector('#email').value;
      const name = document.querySelector('#name').value;
      const surname = document.querySelector('#surname').value;
      const address = document.querySelector('#address').value;
      const zip = document.querySelector('#zip').value;
      const city = document.querySelector('#city').value;
      const tel = document.querySelector('#phone').value;
      const check = document.querySelector('#check').checked;
  
      const user = {
          name: name, surname: surname, address: address, zip: zip, city: city, phone: tel, email: email, agree: check, password: password
      }
      //send all values through post
      fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({user}),
      })
        .then(() => {
          window.open("index.html");
        })
        .catch((error) => console.log(error));
      form.reset();
    } else {
      alert("Nesutampa slaptažodžiai, suveskite iš naujo");
    }
})