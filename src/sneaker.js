class Sneaker {
    // We give two arguments, one for the sneaker data and the other for the sneaker attributes (we can call it whatever we want so we chose sneakerAttributes)
    constructor(sneaker, sneakerAttributes) {
        this.id = sneaker.id
        this.name = sneakerAttributes.name
        this.description = sneakerAttributes.description
        this.imageUrl = sneakerAttributes.imageUrl
        this.quantity = sneakerAttributes.quantity
        this.shoeSize = sneakerAttributes.shoeSize
        this.category = sneakerAttributes.category

        Sneaker.all.push(this)
        // console.log(this)
        //  
        // Push all instances of this to the array
    }

    update(sneakerData, sneakerAttributes) { 
      this.id =  sneakerData.id
      this.name = sneakerAttributes.name
      this.description = sneakerAttributes.description
      this.imageUrl = sneakerAttributes.imageUrl
      this.quantity = sneakerAttributes.quantity
      this.shoeSize = sneakerAttributes.shoeSize
      this.category.name = sneakerAttributes.category.name
    }
    // The constructor allowed us to use this to pass in the sneaker attributes defined above
    renderSneakerCard() {
          return `
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
            <br><br>
              <img src=${this.imageUrl} onmouseover="style.resize" class="card-img-top" alt="...">
              <br><br>
              <div class="card-body">
                <h5 class="zoom" onmouseover="style.color='#ffc600'" onmouseout="style.color='black'">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <p class="card-title">Quantity: ${this.quantity}</p>
                <p class="card-title">Shoe Size: ${this.shoeSize}</p>
                <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Category: ${this.category.name}</small>
                <br><br>
                  <div class="btn-group">
                    <button data-id=${this.id} id="edit" data-action="edit" data-name="${this.name}" data-description="${this.description}" data-image_url="${this.imageUrl}" data-category="${this.category}" data-quantity="${this.quantity}" data-shoe-size="${this.shoe_size}" type="button" class="btn btn-primary">Edit</button>
                    <button data-id=${this.id} id="delete" data-action="delete" data-name="${this.name}" data-description="${this.description}" data-image_url="${this.imageUrl}" data-category="${this.category}" data-quantity="${this.quantity}" data-shoe-size="${this.shoe_size}" type="button" class="btn btn-primary">Delete</button>
                  </div>
                  <br>
                </div>
              </div>
            </div>
          </div>
          `
    }

    renderUpdateForm() {
      return `
      <form data-id=${this.id} id="update-${this.id}">
        <br>
          <h3>EDIT YOUR SNEAKER</h3>
        
          <label>Sneaker Name</label>
          <input id='input-name' type="text" name="name" value="${this.name}" class="input-text" onfocus="myFunction(this)">
          <br><br>

          <label>Sneaker Description</label>
          <br><br>
          <textarea id='input-description' name="description" rows="8"  cols="80" value="${this.description}" onfocus="myFunction(this)">${this.description}"</textarea>
          <br><br>

          <label>Image URL</label>
          <br><br><br>
          <img src=${this.imageUrl} class="card-img-top" alt="...">
          <br><br>
          <input id='input-url' type="text" name="image" value="${this.imageUrl}" class="input-text" onfocus="myFunction(this)">
          <br><br>
          <label>Quantity</label>
          <h3><input id='input-quantity' type="number" value="${this.quantity}" min="0" max="100" step="1"/></h3>
          <br>
          <label>Shoe Size: </label>
          <h3><input id='input-shoeSize' type="number" value="${this.shoeSize}" data-decimals="1" min="1" max="15" step="0.5"/></h3>

          <label>Sneaker Category</label>
          <h3>Current Category: ${this.category.name}</h3>
          <p>Must select a category, if category is the same please reselect it.</p>
          <select id='input-categories' type="text" name="categories" value="${this.category.name}">
              <option value=0>--Select Category--</option>
              <option value=4>Basketball</option>
              <option value=5>Lifestyle</option>
              <option value=36>Running</option>
          </select>
          <br><br>
          <input id='edit button' type="submit" name="submit" value="Edit Sneaker" class="submit">
          <br><br>
      </form>

      ` 
    }


    static findById(id) {
      //  
        return this.all.find(sneaker => sneaker.id == id);
    }

}

Sneaker.all = [];


