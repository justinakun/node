const form = document.querySelector('form');
const output = document.querySelector('#output');
const cancelBtn = document.querySelector('#cancelBtn');
const memShips = [];

// add membership options
fetch('http://localhost:3000/memberships')
  .then((resp) => resp.json())
  .then((response) => {
    response.forEach((membership) => {
      const option = document.createElement('option');

      // if doesn't exist in the array, push (to make sure there are no duplicates)
      if (!memShips.includes(membership.name)) {
        memShips.push(membership.name);
        option.value = membership._id;
        option.textContent = membership.name;
        document.querySelector('select').append(option);
      }
    });
  });

// create a new user
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const surname = document.querySelector('#surname').value;
  const email = document.querySelector('#email').value;
  const membershipField = document.querySelector('#memberships').value;

  // generate random ip
  const ip = generateRandomIP();

  // making sure the input fields are not empty
  if (name === '' || surname === '' || email === '') {
    output.textContent = 'All fields must be filled in before submitting';
  } else {
    // post the user to the database
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        surname,
        email,
        ip,
        service_id: membershipField,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        output.textContent = 'A new user has been successfully created';
      })
      .catch((error) => console.log(error));
    form.reset();
  }
});

cancelBtn.addEventListener('click', () => {
  window.location.href = 'usermanagement.html';
});

// ip generator function
function generateRandomIP() {
  const ip = [];
  for (let i = 0; i < 4; i++) {
    ip.push(Math.floor(Math.random() * 256));
  }
  return ip.join('.');
}
