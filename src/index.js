const endPoint = "http://localhost:3000/api/v1/sneakers"

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load sneakers
  console.log("DOM is Loaded");
  getSneakers()

  const createSneakerForm = document.querySelector("#create-sneaker-form")

  createSneakerForm.addEventListener("submit", (e) => createFormHandler(e))

  const sneakerContainer = document.querySelector('#sneaker-container')
  // render edit form once its clicked
  sneakerContainer.addEventListener("click", e => {
    
    const id = parseInt(e.target.dataset.id);
    const sneaker = Sneaker.findById(id);
    if (e.target.dataset.action === 'edit') {
      console.log('you pressed edit')
      const editSneaker = document.querySelector('#sneaker-container')
      // debugger
      editSneaker.innerHTML = sneaker.renderUpdateForm();
       
    } else if (e.target.dataset.action === 'delete') {
      // window.alert("You deleted your sneaker")
      console.log('you pressed delete')
 
      deleteSneaker(sneaker)
 
    }
 
   });
   
  document.querySelector('#sneaker-container').addEventListener("submit", (e) => updateFormHandler(e))
  const sneakerEl = document.getElementById('create-button')

  const sneakerDiv = document.getElementById('create-message')

  const onSneakerClick = function() {
    sneakerDiv.textContent = "You've Created a New Sneaker, Please look at the newly added Sneaker on your list below!"
  }
  // debugger

  sneakerEl.addEventListener("click", onSneakerClick)
});


function updateFormHandler(e) {
  e.preventDefault();
  const id = parseInt(e.target.dataset.id)
  const sneaker = Sneaker.findById(id)
  const name = e.target.querySelector('#input-name').value
  const description = e.target.querySelector('#input-description').value
  const imageUrl = e.target.querySelector('#input-url').value
   
  const quantity = e.target.querySelector('#input-quantity').value
  const shoeSize = e.target.querySelector('#input-shoeSize').value
  const categoryId = parseInt(e.target.querySelector('#input-categories').value)

  patchSneaker(sneaker, name, description, imageUrl, quantity, shoeSize, categoryId)
}

function patchSneaker(sneaker, name, description, imageUrl, quantity, shoeSize, categoryId) {
  const bodyJSON = { name, description, imageUrl, quantity, shoeSize, categoryId }
  fetch(`http://localhost:3000/api/v1/sneakers/${sneaker.id}`, {
  
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(bodyJSON),
  })
    .then(response => response.json())
    
    .then(sneaker => {
      // debugger
      let updatedSneaker = new Sneaker(sneaker.data, sneaker.data.attributes)

      let sneakerContainer = document.querySelector('#sneaker-container') 

      sneakerContainer.innerHTML += updatedSneaker.renderSneakerCard();
      //  location.reload(endPoint)
    })
    window.confirm("You edited your sneaker")
  location.reload(endPoint)
}

function getSneakers() {
  fetch(endPoint)
  .then(response => response.json())
  .then(sneakers => {

    const mappedSneakers = sneakers.data.map( e => e)
    mappedSneakers.sort( (a, b) => {
      
      if ( a.attributes.name < b.attributes.name ){
        return -1;
      }
      if ( a.attributes.name > b.attributes.name ){
        return 1;
      }
      return 0;
    })

    // debugger

    console.log(`sneakers.data are equal? ${sneakers.data == mappedSneakers}`)
  
    mappedSneakers.forEach(sneaker => {

        let newSneaker = new Sneaker(sneaker, sneaker.attributes)

        let sneakerContainer = document.querySelector('#sneaker-container')

        sneakerContainer.innerHTML += newSneaker.renderSneakerCard();

    })
  })
}


function deleteSneaker(sneaker) {

  fetch(`http://localhost:3000/api/v1/sneakers/${sneaker.id}`, {

    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    
  })
  .then(response => response.json());
  window.alert("You deleted your sneaker")
  location.reload(endPoint)
}


function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const quantityInput = document.querySelector('#input-quantity').value
  const shoeSizeInput = document.querySelector('#input-shoeSize').value
  const categoryId = parseInt(document.querySelector('#categories').value)

  postSneaker(nameInput, descriptionInput, imageInput, quantityInput, shoeSizeInput, categoryId)
}

function postSneaker(name, description, imageUrl, quantity, shoeSize, categoryId) {
  // confirm these values are coming through properly
  // build body object

  const bodyData = {name, description, imageUrl, quantity, shoeSize, categoryId}

  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(sneaker => {
     

    let newSneaker = new Sneaker(sneaker.data, sneaker.data.attributes)

    let sneakerContainer = document.querySelector('#sneaker-container')
       
    sneakerContainer.innerHTML += newSneaker.renderSneakerCard();
    window.confirm("You created a new sneaker!")
    location.reload(endPoint) 
  })
}