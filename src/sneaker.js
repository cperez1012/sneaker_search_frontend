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
        Sneaker.all.push(this)
        // debugger
        // Push all instances of this to the array
    }
    // The constructor allowed us to use this to pass in the sneaker attributes defined above
    renderSneakerCard() {
        // debugger
        // console.log(this)
        return `
          <div data-id=${this.id}>
              <img src=${this.image_url} height="200" width="250">
              <h3>${this.name}</h3>
              <p>${this.category.name}</p>
              <button data-id=${this.id}>edit</button>
          </div>
          <br><br>`;
    }
    static findById(id) {
        return this.all.find(sneaker => sneaker.id === id);
    }
}



Sneaker.all = [];



