// récupération de la chaine de requete ou url
let queryString_url_id = window.location.search;

//méthode 1 de récupération de l'id : récupérer l'id dans l'url.

//windows.location.search sert à récupérer le paramètre se situant après le ? de la chaine de requete.
//la méthode slice(1) supprime le ? de la chaine de requete.
//let articleId = queryString_url_id.slice(1) ;

//méthode 2 de récupération de l'id : UrlSearchParams.
//UrlsearchParams est un constructor contenant les paramètres de la chaine de requete.
//attention ! : ici, on récupère l'id mentionné dans l'url au moment de sa création.
const urlSearchParams = new URLSearchParams(queryString_url_id);

var id = urlSearchParams.get("id");


//----------------------------------------Affichage de la fiche produit-------------------------------------------------------------//


/*variable url contenant l'url de base de l'api*/
const url = "http://localhost:3000/api/teddies/";

/*récupération de l'emplacement des fiches produits */
const productCard = document.getElementById('product_card');

/*fonction d'ajout des options de personnalisation*/
function AddSelectOption (elementColors, select) {
  for (let color of elementColors) {
    let options = document.createElement('option');
    options.text = color;
    options.value = color;
    select.appendChild(options);
  };
} ;

/*fonction d'ajout au localStorage*/
function AddToLocalStorage (keyArticles, articles) {
  localStorage.setItem(keyArticles, JSON.stringify(articles));
  console.log(articles);
} ;

/*fonction d'ajout des produits dans le panier*/
function AddProductsToCart (articles, article) {
  /**s'il y a des produits dans la variable products**/
  if (articles != null) {
    var found = false;
    articles.forEach(element => {
      if (element.id == article.id) {
        element.quantity = element.quantity + 1;
        found = true;
      }
    });
    if(!found) {
      articles.push(article);
    }
    AddToLocalStorage("produit", articles) ;
    /**s'il n'y a pas de produits dans la variable products**/
  } else {
    articles = [];
    articles.push(article);
    AddToLocalStorage("produit", articles) ;
  };
};

/*fonction d'affichage de la fiche produit*/
function DisplayDownloadedProduct(productElements) {

  /**
     * *affichage du nom dans la barre de navigation
     */
   let productName = document.getElementById("productName") ;
   productName.innerHTML = `"${productElements.name}"` ;

  //création de l'élément html de la fiche produit
  productCard.innerHTML += `
    <article class="card mb-5" id="${productElements._id}">
      <img src="${productElements.imageUrl}" class=" card-img card-img-top img-fluid" alt="peluche fait main ${productElements.name}">
      <div class="card-body text-center">
        <h2 class="card-title mb-3 h1">${productElements.name}</h2>
        <p class="card-text">${productElements.description}</p>
        <p class="card_text">Prix : <span class="fw-bold h4">${productElements.price/100}€</span></p>
        <form>
          <label for="colorSelect" class="form-label">Choisissez votre couleur :</label>
          <select name="color" id="colorSelect" class="form-select mb-4" arial-labelby="color"></select>
        <form>
        <p class="fw-bold">Choisissez la quantité de votre produit dans votre panier.</p>
      </div>
      <div class="card-footer text-center">
        <button type="button" id="btnSubmit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmationModal" aria-label="mettre dans le panier">Mettre dans le Panier</button>
      </div>
    </article>
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="confirmationModalLabel">${productElements.name} a bien été rajouté au panier.</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="fermer"></button>
          </div>
          <div class="modal-body">
            <img src="${productElements.imageUrl}" class="card-img-top" alt="peluche fait main ${productElements.name}">
            <h3 class="card-title">${productElements.name}</h2>
            <p class="card_text">Prix : <span class="fw-bold">${productElements.price/100}€</span></p>
          </div>
          <div class="modal-footer">
            <a href="/front-end/view/cart/cart.html" class="btn btn-success" aria-label="finaliser ma commande">Finaliser ma commande</a>
            <a href="/front-end/view/home/index.html" class="btn btn-primary" aria-label="continuer mes achats">Continuer mes achats</a>
          </div>
        </div>
      </div>
    </div>`;

  //création des options de couleurs présents dans l'array productElements.colors
  let productSelectColor = document.getElementById("colorSelect");
  AddSelectOption(productElements.colors, productSelectColor) ;
  
  
  let btnSubmit = document.getElementById('btnSubmit');
  
  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault;

    /*création de l'objet à transmettre au panier*/
    let productReadyToBuy = {
      id: productElements._id,
      image: productElements.imageUrl,
      name: productElements.name,
      price: productElements.price,
      quantity: 1
    };
  
    //déclaration de la variable products qui contiendra les clés productReadyToBuy 
    let products = JSON.parse(localStorage.getItem("produit"));
    //appel de la fonction d'ajout au panier
    AddProductsToCart(products, productReadyToBuy) ;
  });
};

//function de récupération des informations du produit via l'id
function DownloadProductById(url, id) {
  fetch(`${url}${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(DisplayDownloadedProduct)
    .catch((err) => {
      console.log(err);
    });
};

//chargement des données du produit et affichage du produit à l'aide de son id
DownloadProductById(url, id);

//--------------------------------------Fin affichage de la fiche produit----------------------------------------------------------//
