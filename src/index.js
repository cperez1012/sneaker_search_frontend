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

function postFetch(name, description, image_url, category_id) {
  console.log(name, description, image_url, category_id)
}