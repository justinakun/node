// fetch('http://localhost:3000/memberships')
//   .then((resp) => resp.json())
//   .then((response) => {
//     response.forEach((user) => {
//       const box = document.createElement('div');
//       const price = document.createElement('h5');
//       const name = document.createElement('h5');
//       const description = document.createElement('p');

//       price.textContent = user.price;
//       name.textContent = user.name;
//       description.textContent = user.description;

//       const container = document.querySelector('.boxes');
//       container.append(box);
//       console.log('hello');
//     });
//   });

fetch('http://localhost:3000/memberships')
  .then((resp) => resp.json())
  .then((response) => console.log(response));
