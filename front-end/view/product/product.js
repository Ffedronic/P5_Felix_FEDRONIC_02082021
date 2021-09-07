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
console.log(id);

//----------------------------------------Affichage de la fiche produit-------------------------------------------------------------//
const url = "http://localhost:3000/api/teddies/";

//récupération de l'emplacement des fiches produits 
const productCard = document.getElementById('product_card');

// fonction d'affichage de la fiche produit
function DisplayDownloadProductDetails(productElements) {

  //création de la fiche produit à partir des données du produit présents dans l'élément de promesse productElements
  productCard.innerHTML += `
    <article class="card mb-5 w-75" id="${productElements._id}">
      <img src="${productElements.imageUrl}" class=" card-img card-img-top img-fluid" alt="peluche fait main ${productElements.name}">
      <div class="card-body text-center">
        <h2 class="card-title mb-3 h1">${productElements.name}</h2>
        <p class="card-text">${productElements.description}</p>
        <p class="card_text">Prix : <span class="fw-bold h4">${productElements.price/100}€</span></p>
        <form>
          <label for="colorSelect" class="form-label">Choisissez votre couleur :</label>
          <select name="color" id="colorSelect" class="form-select mb-4" arial-labelby="color"></select>
        <form>
      </div>
      <div class="card-footer text-center">
        <button type="button" id="btnSubmit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Mettre dans le Panier</button>
      </div>
    </article>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">${productElements.name} a bien été rajouté au panier.</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img src="${productElements.imageUrl}" class="card-img-top" alt="peluche fait main ${productElements.name}">
            <h3 class="card-title">${productElements.name}</h2>
            <p class="card_text">Prix : <span class="fw-bold">${productElements.price/100}€</span></p>
          </div>
          <div class="modal-footer">
            <a href="/front-end/view/cart/cart.html" class="btn btn-secondary">Mon Panier</a>
            <a href="/front-end/view/home/index.html" class="btn btn-primary">Liste des produits</a>
          </div>
        </div>
      </div>
    </div>`;

  //création des options de couleurs présents dans l'array productElements.colors
  let productSelectColor = document.getElementById("colorSelect");
  for (let color of productElements.colors) {
    let options = document.createElement('option');
    options.text = color;
    options.value = color;
    productSelectColor.appendChild(options);
  };
  let btnSubmit = document.getElementById('btnSubmit');
  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault;
    sendProductToLocalStorage(productElements) ;
  });
};

//function de récupération des informations du produit via l'id
function downloadProductById(url, id) {
  fetch(`${url}${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(DisplayDownloadProductDetails)
    .catch((err) => {
      console.log(err);
    });
};

//chargement des données du produit à l'aide de son id
downloadProductById(url, id);

//--------------------------------------Fin affichage de la fiche produit----------------------------------------------------------//
