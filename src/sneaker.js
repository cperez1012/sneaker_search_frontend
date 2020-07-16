class Sneaker {
    // This code allows us to only see the sneaker data but attributes are shown as undefined because the data is nested under attributes
    // constructor(data) {
    //     this.id = data.id
    //     this.name = data.name
    //     this.description = data.description
    //     this.image_url = data.image_url
    //     this.category = data.category
    // }
    // We give two arguments, one for the sneaker data and the other for the sneaker attributes (we can call it whatever we want so we chose sneakerAttributes)
    constructor(sneaker, sneakerAttributes) {
        this.id = sneaker.id
        // debugger
        this.name = sneakerAttributes.name
        this.description = sneakerAttributes.description
        this.image_url = sneakerAttributes.image_url
        this.category = sneakerAttributes.category
        // debugger
        Sneaker.all.push(this)
        console.log(this)
        // debugger
        // Push all instances of this to the array
    }

    update(sneakerData, sneakerAttributes) {
      this.id =  sneakerData.id
      this.name = sneakerAttributes.name
      this.description = sneakerAttributes.description
      this.image_url = sneakerAttributes.image_url
      this.category.name = sneakerAttributes.category.name
    // update( sneaker ) {
    //   this.id =  sneaker.id
    //   this.name = sneaker.attributes.name
    //   this.description =  sneaker.attributes.description
    //   this.image_url =  sneaker.attributes.image_url
    //   this.category.name =  sneaker.attributes.category.name
      // Sneaker.all.push(this)
      debugger
    }
    // The constructor allowed us to use this to pass in the sneaker attributes defined above
    renderSneakerCard() {
        // debugger
        // console.log(this)
        // return `
        //   <div data-id=${this.id}>
        //       <img src=${this.image_url} height="200" width="250">
        //       <h3>${this.name}</h3>
        //       <p>${this.category.name}</p>
        //       <button data-id=${this.id}>edit</button>
        //   </div>
        //   <br><br>`;
          
          return `
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src=${this.image_url} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button data-id=${this.id} type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button data-id=${this.id} id="edit-${this.id}" data-action="edit" data-name="${this.name}" data-description="${this.description}" data-image_url="${this.image_url}" data-category="${this.category}" type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    <button data-id=${this.id} id="delete-${this.id}" data-action="delete" data-name="${this.name}" data-description="${this.description}" data-image_url="${this.image_url}" data-category="${this.category}"type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                  </div>
                  <small class="text-muted">Category: ${this.category.name}</small>
                </div>
              </div>
            </div>
          </div>
          `
    }

    renderUpdateForm() {
      return `
      <form data-id=${this.id} id="update-${this.id}">
          <h3>Edit a Sneaker!</h3>
          
          <label>Sneaker Name</label>
          <input id='input-name' type="text" name="name" value="${this.name}" class="input-text">
          <br><br>

          <label>Sneaker Description</label>
          <textarea id='input-description' name="description" rows="8"  cols="80" value="${this.description}"></textarea>
          <br><br>

          <label>Image URL</label>
          <input id='input-url' type="text" name="image" value="${this.image_url}" class="input-text">
          <br><br>

          <label>Sneaker Category</label>
          <select id='input-categories' type="text" name="categories" value="${this.category.name}">
              <option value="1">Basketball</option>
              <option value="2">Lifestyle</option>
              <option value="3">Running</option>
          </select>
          <br><br>

          <input id='edit button' type="submit" name="submit" value="Edit Sneaker" class="submit">
      </form>

      ` 
  }

    static findById(id) {
      // debugger
        return this.all.find(sneaker => sneaker.id == id);
    }

}

Sneaker.all = [];


