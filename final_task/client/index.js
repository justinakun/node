fetch('http://localhost:3000/memberships')
  .then((resp) => resp.json())
  .then((response) => {
    response.forEach((service) => {
      const box = document.createElement('div');
      const priceName = document.createElement('h3');
      const description = document.createElement('p');
      const deleteIcon = document.createElement('i');

      priceName.textContent = `$${service.price} ${service.name}`;
      description.textContent = service.description;
      deleteIcon.classList.add('fas', 'fa-trash-alt', 'deleteIcon');
      deleteIcon.setAttribute('data-id', service['_id']);

      box.append(priceName, description, deleteIcon);

      // add the CSS
      box.classList.add('box');
      box.classList.add('relative');

      const boxes = document.querySelector('.boxes');
      boxes.append(box);

      deleteIcon.addEventListener('click', (e) => {
        console.log('clicked');
        const itemId = e.target.getAttribute('data-id');

        fetch(`http://localhost:3000/memberships/${itemId}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              console.log(`Item with ID ${itemId} was deleted`);
              location.reload();
            } else {
              console.error(`Error deleting item with ID ${itemId}`);
            }
          })
          .catch((error) => {
            console.error(`Error deleting item with ID ${itemId}: ${error}`);
          });
      });
    });
  });

document.querySelector('#newMember').addEventListener('click', () => {
  window.location.href = 'newmembership.html';
});
