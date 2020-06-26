// class Sneaker {
//     constructor(id, sneakerAttributes) {
//       this.id = id;
//       this.name = sneakerAttributes.name;
//       this.description = sneakerAttributes.description;
//       this.image_url = sneakerAttributes.image_url;
//       this.category = sneakerAttributes.category;
//       Sneaker.all.push(this);
//     }
  
//     renderSneakerCard() {
//       return `
//               <div data-id=${this.id}>
//                 <img src=${this.image_url} height="200" width="250">
//                 <h3>${this.name}</h3>
//                 <p>${this.category.name}</p>
//                 <button data-id=${this.id}>edit</button>
//               </div>
//               <br><br>`;
//     }
//   }
  
//   Sneaker.all = [];