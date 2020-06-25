const endPoint = "http://localhost:3000/api/v1/sneakers"

document.addEventListener('DOMContentLoaded', () => {
    // fetch("http://localhost:3000/api/v1/sneakers")
    // .then(response => response.json())
    // .then(sneakers => {
    //     console.log(sneakers);
    // })
  getSneakers()

  const createSneakerForm = document.querySelector("#create-sneaker-form")

  createSneakerForm.addEventListener("submit", (e) => createFormHandler(e))
})

    // function getSneakers() {
    //     fetch(endPoint)
    //     .then(response => response.json())
    //     .then(sneakers => {
    //     // console.log(sneakers);
    //     })
    // }
function getSneakers() {
  fetch(endPoint)
  .then(response => response.json())
  .then(sneakers => {
    sneakers.data.forEach(sneaker => {
        // debugger
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
        const sneakerMarkup = `
          <div data-id=${sneaker.id}>
            <img src=${sneaker.attributes.image_url} height="200" width="250">
            <h3>${sneaker.attributes.name}</h3>
            <p>${sneaker.attributes.category.name}</p>
            <button data-id=${sneaker.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#sneaker-container').innerHTML += sneakerMarkup
      })
    })
}

function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryId = parseInt(document.querySelector('#categories').value)
  postFetch(nameInput, descriptionInput, imageInput, categoryId)
}

function postSneaker(name, description, image_url, category_id) {
  // confirm these values are coming through properly
  console.log(name, description, image_url, category_id);
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
    console.log(sneaker);
    const sneakerData = sneaker.data
    // render JSON response
    const sneakerMarkup = `
    <div data-id=${sneaker.id}>
      <img src=${sneakerData.attributes.image_url} height="200" width="250">
      <h3>${sneakerData.attributes.title}</h3>
      <p>${sneakerData.attributes.category.name}</p>
      <button data-id=${sneakerData.id}>edit</button>
    </div>
    <br><br>`;

    document.querySelector('#sneaker-container').innerHTML += sneakerMarkup;
  })
}