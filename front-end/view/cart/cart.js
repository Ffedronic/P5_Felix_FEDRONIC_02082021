//----------déclaration de la variable products qui contiendra les clés productReadyToBuy----------// 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit"));

//--------------------affichage des produits dans la page panier-----------------------------------//

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

//si le localStorage ne contient pas de produit
if(listOfProductStorage==null || listOfProductStorage==0) {
  lengthOfProductsInCart.innerHTML = "Le panier est vide" ;
} 
//si le localStorage contient des produits
else{
  for(let product of listOfProductStorage) {
    //calcul du prix total de la commande
    productsTotalPrice += (product.quantity*product.price)/100 ;
    //calcul de la quantité totale des produits présents dans le localStorage
    productsQuantities += product.quantity ;
    //création des éléments à afficher pour chaque produit
    displayProducts += `
      <article class="card mb-3" id="${product.id}" style="max-width: 600px;">
      <div class="row">
        <div class="col-md-4">
          <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name} peluche faite main" style="min-height: 150px;">
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex justify-content-between align-items-baseline">
            <h3 class="card-title">${product.name}</h3>
            <div>
              <h4 class="card-text" id="quantityProduct">Quantité : <span><button type="button" class="btn btn-success" id="${product.id}"><i class="fas fa-plus-square"></i></button></span> ${product.quantity} <span><button type="button" class="btn btn-warning" id="${product.id}"><i class="fas fa-minus-square"></i></button></span></h4>
              <h5 class="card-text">Prix :<span id="subtotalProduct">${(product.price/100)*product.quantity}<span>€</h5>
              <button type="button" class="btn btn-danger" id="${product.id}"><i class="fas fa-trash-alt text-white"></i><span class="p-2 text-white fw-bold">Supprimer</span></button>
            </div>
          </div>
        </div>
      </div>
    </article>
    `
    ;  
  }
  //affichage du montant total de la commande
  totalAmountInCart.innerHTML = `${productsTotalPrice} €`
  //affichage de la quantité totale de produits dans le localStorage
  lengthOfProductsInCart.innerHTML = `Le panier contient ${productsQuantities} articles.` ;
  //affichage des produits sur la page panier
  displayProductsInCart.innerHTML = displayProducts ;
} ;

//----------------------------modification de la quantité par article----------------------------------------//

//diminution des quantités du produit
let btnDelete = document.querySelectorAll(".btn-warning") ;
//au click
btnDelete.forEach(btnDeleteQelement => {
  btnDeleteQelement.addEventListener('click', event => {
    event.preventDefault ;
    event.stopPropagation ;
    //je sélectionne l'id du bouton de diminution de la quantité du produit
    let btnDeleteQuantityProductId = btnDeleteQelement.getAttribute('id') ;
    console.log("je diminue la quantité du produit" +" "+ btnDeleteQuantityProductId ) ;
    if(listOfProductStorage!==null) {
      listOfProductStorage.forEach( element => {
        //si l'id du bouton correspond au produit dans le localStoraga
        if(element.id == btnDeleteQelement.id) {
          //alors je diminue la quantité du produit dans le localStorage
          element.quantity = element.quantity - 1 ;
          localStorage.setItem("produit", JSON.stringify(listOfProductStorage)) ;
          console.log(listOfProductStorage) ;
          //je recharge la page pour afficher les nouvelles valeurs du produit
          window.location.reload() ;
          //si la quantité du produit est égale ou inférieure à 0 alors je supprime le produit du localStorage
          if(element.quantity <= 0) {
            listOfProductStorage = listOfProductStorage.filter(element => element.id !== btnDeleteQelement.id) ;
            localStorage.setItem("produit", JSON.stringify(listOfProductStorage)) ;
            console.log(listOfProductStorage) ;
            window.location.reload() ;
          } ;
        };
      });
    } ;
  });
}) ;

//ajout des quantités du produit
let btnAdd = document.querySelectorAll(".btn-success") ;
btnAdd.forEach(btnAddElement => {
  btnAddElement.addEventListener('click', event => {
    event.preventDefault ;
    event.stopPropagation ;
    //je sélectionne l'id du bouton de diminution de la quantité du produit
    let btnAddQuantityProductId = btnAddElement.getAttribute('id') ;
    console.log("j'augmente la quantité du produit" + " " + btnAddQuantityProductId) ;
    if(listOfProductStorage!==null) {
      listOfProductStorage.forEach( element => {
        var found = false ;
        //si l'id du bouton correspond au produit dans le localStorage
        if(element.id == btnAddElement.id) {
          //alors j'augmente la quantité du produit dans le localStorage
          element.quantity = element.quantity + 1 ;
          found = true ;
          localStorage.setItem("produit", JSON.stringify(listOfProductStorage)) ;
          console.log(listOfProductStorage) ;
          window.location.reload() ;
        };
      });
    } ;
  }) ;
}) ;

//suppression des produits
let btnDeleteProduct = document.querySelectorAll(".btn-danger") ;
btnDeleteProduct.forEach(element => {
  //au click
  element.addEventListener('click', event => {
    event.preventDefault ;
    event.stopPropagation ;
    //je sélectionne l'id du bouton correspondant au produit à supprimer
    let btnDeleteProductId = element.getAttribute('id') ;
    console.log("je supprime le produit" + " " + btnDeleteProductId) ;
    if(listOfProductStorage !== null){
      found=false;
      listOfProductStorage.forEach(element => {
        //si le produit se trouve dans le localStorage
        if(element.id == btnDeleteProductId){
          found=true;
          //alors je le supprime du localStorage
          listOfProductStorage = listOfProductStorage.filter(elementToDelete => elementToDelete.id !== btnDeleteProductId) ;
          localStorage.setItem("produit", JSON.stringify(listOfProductStorage)) ;
          window.location.reload() ;
        };
      });
    };
  });
}) ;

//---------------récupération des informations à transmettre au serveur---------------------------------//

//au click sur le bouton de validation de la commande

