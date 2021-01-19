// const endPoint = "http://localhost:3000/api/v1/sneakers"
const endPoint = "http://localhost:3000/api/v2/sneakers"

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
     editSneaker.innerHTML = sneaker.renderUpdateForm();
      
   } else if (e.target.dataset.action === 'delete') {
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

  sneakerEl.addEventListener("click", onSneakerClick)
});


function updateFormHandler(e) {
  e.preventDefault();
  const id = parseInt(e.target.dataset.id)
  const sneaker = Sneaker.findById(id)
  const name = e.target.querySelector('#input-name').value
  const description = e.target.querySelector('#input-description').value
  const imageUrl = e.target.querySelector('#input-url').value
  const categoryId = parseInt(e.target.querySelector('#input-categories').value)

  patchSneaker(sneaker, name, description, imageUrl, categoryId)
}

function patchSneaker(sneaker, name, description, imageUrl, categoryId) {
  const bodyJSON = { name, description, imageUrl, categoryId }
  // fetch(`http://localhost:3000/api/v1/sneakers/${sneaker.id}`, {
  fetch(`http://localhost:3000/api/v2/sneakers/${sneaker.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(bodyJSON),
  })
    .then(response => response.json())

    .then(sneaker => {
      console.log(sneaker)
      // debugger
      let updatedSneaker = new Sneaker(sneaker.data, sneaker.data.attributes)

      let sneakerContainer = document.querySelector('#sneaker-container') 

     sneakerContainer.innerHTML += updatedSneaker.renderSneakerCard();
      location.reload(endPoint)
    })
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

    console.log(`sneakers.data are equal? ${sneakers.data == mappedSneakers}`)
  
    mappedSneakers.forEach(sneaker => {

        let newSneaker = new Sneaker(sneaker, sneaker.attributes)

        let sneakerContainer = document.querySelector('#sneaker-container')

        sneakerContainer.innerHTML += newSneaker.renderSneakerCard();

    })
  })
}


function deleteSneaker(sneaker) {

  // fetch(`http://localhost:3000/api/v1/sneakers/${sneaker.id}`, {
  fetch(`http://localhost:3000/api/v2/sneakers/${sneaker.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    
  })
  .then(response => response.json());

location.reload(endPoint) 
}


function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryId = parseInt(document.querySelector('#categories').value)

  postSneaker(nameInput, descriptionInput, imageInput, categoryId)
}

function postSneaker(name, description, imageUrl, categoryId) {
  // confirm these values are coming through properly
  // build body object

  const bodyData = {name, description, imageUrl, categoryId}

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
  })
}

function myFunction(x) {
  x.style.background = "beige";
}

// Render Google Sign-in button
function renderButton() {
  gapi.signin2.render('gSignIn', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
  });
}

// Sign-in success callback
function onSuccess(googleUser) {
  // Get the Google profile data (basic)
  //var profile = googleUser.getBasicProfile();
  
  // Retrieve the Google account data
  gapi.client.load('oauth2', 'v2', function () {
      var request = gapi.client.oauth2.userinfo.get({
          'userId': 'me'
      });
      request.execute(function (resp) {
          // Display the user details
          var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
          profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
          document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
          
          document.getElementById("gSignIn").style.display = "none";
          document.getElementsByClassName("userContent")[0].style.display = "block";
      });
  });
}

// Sign-in failure callback
function onFailure(error) {
  alert(error);
}

// Sign out the user
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      document.getElementsByClassName("userContent")[0].innerHTML = '';
      document.getElementsByClassName("userContent")[0].style.display = "none";
      document.getElementById("gSignIn").style.display = "block";
  });
  
  auth2.disconnect();
}