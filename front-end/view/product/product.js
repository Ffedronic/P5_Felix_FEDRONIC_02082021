
// récupération de la chaine de requete ou url
let queryString_url_id = window.location.search ;

//méthode 1 de récupération de l'id : récupérer l'id dans l'url.
//windows.location.search sert à récupérer le paramètre se situant après le ? de la chaine de requete.
//la méthode slice(1) supprime le ? de la chaine de requete.
//let articleId = queryString_url_id.slice(1) ;

//méthode 2 de récupération de l'id : UrlSearchParams.
//UrlsearchParams est un constructor contenant les paramètres de la chaine de requete.
//attention ! : ici, on récupère le id mentionné dans l'url au moment de sa création.
let urlSearchParams = new URLSearchParams(queryString_url_id) ;
let id = urlSearchParams.get("id") ;
console.log(id) ;

//chargement des données du produit à l'aide de son id
fetch(`http://localhost:3000/api/teddies/${id}`)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(productElements) {
  
  //création de la fiche produit à partir des données du produit présents dans l'élément de promesse productElements
  let productCard = document.getElementById('product_card') ;
  productCard.innerHTML += `<article class="card" id="${productElements._id}">
                                <img src="${productElements.imageUrl}" class="card-img-top" alt="${productElements.name}">
                                <div class="card-body">
                                  <h2 class="card-title">${productElements.name}</h2>
                                  <p class="card-text">${productElements.description}</p>
                                  <form>
                                    <label for="color" class="form-label">Choisissez votre couleur :</label>
                                    <select name="color" id="color" class="form-select mb-4" arial-labelby="color"></select>
                                  <form>
                                  <button class="btn btn-primary">Mettre au Panier</button>
                                </div>
                              </article>`
  
  //création des options de couleurs présents dans l'array productElements.colors
  let productSelectColor = document.getElementById("color") ;
  for(let color of productElements.colors) {
    let option = new Option(color, color) ;
    productSelectColor.appendChild(option) ;
  }
})
.catch(function(err) {
  console.error(err) ;
})