const form = document.querySelector('form');
const output = document.querySelector('#output');
const cancelBtn = document.querySelector('#cancelBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('textarea').value;

  if (name === '' || price === '' || description === '') {
    output.textContent = 'All fields must be filled in before submitting';
  } else if (isNaN(price)) {
    output.textContent = 'The price must be a number';
  } else {
    fetch('http://localhost:3000/memberships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price,
        description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        output.textContent = `A new ${data.name} membership for $${data.price} has been successfully created`;
      })
      .catch((error) => console.log(error));
    form.reset();
  }
});

cancelBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
