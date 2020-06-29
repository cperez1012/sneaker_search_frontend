const endPoint = "http://localhost:3000/api/v1/sneakers"

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load syllabi
  console.log("DOM is Loaded");
  getSneakers()

  const createSneakerForm = document.querySelector("#create-sneaker-form")

  createSneakerForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getSneakers() {
  fetch(endPoint)
  .then(response => response.json())
  .then(sneakers => {
    sneakers.data.forEach(sneaker => {
        // debugger
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
        // const sneakerMarkup = `
        //   <div data-id=${sneaker.id}>
        //     <img src=${sneaker.attributes.image_url} height="200" width="250">
        //     <h3>${sneaker.attributes.name}</h3>
        //     <p>${sneaker.attributes.category.name}</p>
        //     <button data-id=${sneaker.id}>edit</button>
        //   </div>
        //   <br><br>`;

        //   document.querySelector('#sneaker-container').innerHTML += sneakerMarkup
        let newSneaker = new Sneaker(sneaker, sneaker.attributes)
       
        document.querySelector('#sneaker-container').innerHTML += newSneaker.renderSneakerCard();
        // render(sneaker)
        // debugger
      })
      // .catch(err => console.log(err))
    })
}

function render(sneaker) {
  const sneakerMarkup = `
    <div data-id=${sneaker.id}>
      <img src=${sneaker.attributes.image_url} height="200" width="250">
      <h3>${sneaker.attributes.name}</h3>
      <p>${sneaker.attributes.category.name}</p>
      <button data-id=${sneaker.id}>edit</button>
    </div>
  <br><br>`;

  document.querySelector('#sneaker-container').innerHTML += sneakerMarkup;
}

function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryId = parseInt(document.querySelector('#categories').value)
  postSneaker(nameInput, descriptionInput, imageInput, categoryId)
}

function postSneaker(name, description, image_url, category_id) {
  // confirm these values are coming through properly
  // build body object
  
  let bodyData = {name, description, image_url, category_id}

  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(sneaker => {
    const sneakerData = sneaker.data
    // render JSON response
    // const sneakerMarkup = `
    // <div data-id=${sneaker.id}>
    //   <img src=${sneakerData.attributes.image_url} height="200" width="250">
    //   <h3>${sneakerData.attributes.name}</h3>
    //   <p>${sneakerData.attributes.category.name}</p>
    //   <button data-id=${sneakerData.attributes.id}>edit</button>
    // </div>
    // <br><br>`;

    // document.querySelector('#sneaker-container').innerHTML += sneakerMarkup;
    // render(sneakerData)
    // Using the newSneaker defined variable in my post request and changing it to sneakerData
    let newSneaker = new Sneaker(sneakerData, sneaker.attributes)
       
    document.querySelector('#sneaker-container').innerHTML += newSneaker.renderSneakerCard();  
  })
}