//--------------------déclaration de la variable products qui contiendra les clés productReadyToBuy 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit"));
console.log(listOfProductStorage) ;
//--------------------affichage des produits dans la page panier

//selection de l'emplacement d'affichage des produits
let displayProductsInCart = document.getElementById("DisplayArticlesInCart") ;

//variable contenant les produits prêts à afficher
let displayProducts = [] ;

//affichage du nombre d'articles dans le localStorage sur la page du panier
let lengthOfProductsInCart = document.getElementById('cardProductsLength');
if(listOfProductStorage==null) {
  lengthOfProductsInCart.innerHTML += "Le panier est vide" ;
} else{
  lengthOfProductsInCart.innerHTML += `Nombre d'articles : ${listOfProductStorage.length}.` ;
  for(let product of listOfProductStorage) {
    displayProducts = displayProducts + `
      <article class="card mb-3" id="${product.id}" style="max-width: 600px;">
      <div class="row">
        <div class="col-md-4">
          <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name} peluche faite main">
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex justify-content-between align-items-baseline">
            <h3 class="card-title">${product.name}</h3>
            <div>
              <p class="card-text h5">Quantité :</p>
              <p class="card-text"></p>
              <p>Prix :${product.price/100}€</p>
              <button type="button" class="btn btn-warning"><i class="fas fa-trash-alt text-black"></i><span class="p-2 text-black fw-bold">Supprimer</span></button>
            </div>
          </div>
        </div>
      </div>
    </article>
    `  
  }
  displayProductsInCart.innerHTML = displayProducts ;  
} ;
//-----affichage du nombre d'articles dans le localStorage sur la page du panier