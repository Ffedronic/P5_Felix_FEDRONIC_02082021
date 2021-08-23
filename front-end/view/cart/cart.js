//--------------------déclaration de la variable products qui contiendra les clés productReadyToBuy 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit"));
console.log(listOfProductStorage) ;
//--------------------affichage des produits dans la page panier

//selection de l'emplacement d'affichage des produits
let displayProductsInCart = document.getElementById("DisplayArticlesInCart") ;

//selection de l'emplacement du nombre de produits
let lengthOfProductsInCart = document.getElementById('cardProductsLength');

//selection de l'emplacement du total de la commande
let totalAmountInCart = document.getElementById('totalAmount');

//création du tableau contenant les produits prêts à afficher
let displayProducts = [] ;

//création de la variable number contenant la quantité totale de produit
let productsQuantities = 0 ;

//création de la variable number contenant le prix total de la commande
let productsTotalPrice = 0;

//---------------------affichage des articles dans le localStorage sur la page du panier--------------------------//
if(listOfProductStorage==null) {
  lengthOfProductsInCart.innerHTML = "Le panier est vide" ;
} 
else{
  for(let product of listOfProductStorage) {
    productsTotalPrice += (product.quantity*product.price)/100 ;
    productsQuantities += product.quantity ;
    displayProducts += `
      <article class="card mb-3" id="${product.id}" style="max-width: 500px;">
      <div class="row">
        <div class="col-md-4">
          <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name} peluche faite main">
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex justify-content-between align-items-baseline">
            <h3 class="card-title">${product.name}</h3>
            <div>
              <p class="card-text h5" id="quantityProduct">Quantité : ${product.quantity}</p>
              <p class="card-text"></p>
              <p class="card-text">Prix :<span id="subtotalProduct">${(product.price/100)*product.quantity}<span>€</p>
              <button type="button" class="btn btn-warning"><i class="fas fa-trash-alt text-black"></i><span class="p-2 text-black fw-bold">Supprimer</span></button>
            </div>
          </div>
        </div>
      </div>
    </article>
    `;  
  }
  totalAmountInCart.innerHTML = `${productsTotalPrice} €`
  lengthOfProductsInCart.innerHTML = `Le panier contient ${productsQuantities} articles.` ;
  displayProductsInCart.innerHTML = displayProducts ;  
} ;
