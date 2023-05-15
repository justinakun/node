let asc = true;
const sort = document.querySelector('.sort');
const boxes = document.querySelector('.boxes');

function fetchUsers() {
  let url = asc
    ? 'http://localhost:3000/users/asc'
    : 'http://localhost:3000/users/dsc';

  fetch(url)
    .then((resp) => resp.json())
    .then((response) => {
      while (boxes.firstChild) {
        boxes.removeChild(boxes.firstChild);
      }

      response.forEach((user) => {
        const box = document.createElement('div');
        const name = document.createElement('h3');
        const email = document.createElement('p');
        const membership = document.createElement('p');
        const ip = document.createElement('p');

        name.textContent = `${user.name} ${user.surname}`;
        email.textContent = `Email address: ${user.email}`;
        membership.textContent = `Membership: ${user.service[0].name}`;
        ip.textContent = `ip: ${user.ip}`;

        box.append(name, email, membership, ip);
        box.classList.add('box');

        boxes.append(box);
      });
    });
}

fetchUsers();

document.querySelector('.sort').addEventListener('click', (event) => {
  event.preventDefault();
  asc = !asc;
  fetchUsers();

  if (sort.textContent === 'Sorting By Name: ASC') {
    sort.textContent = 'Sorting By Name: DSC';
  } else {
    sort.textContent = 'Sorting By Name: ASC';
  }
});

document.querySelector('#newUser').addEventListener('click', () => {
  window.location.href = 'newuser.html';
});
