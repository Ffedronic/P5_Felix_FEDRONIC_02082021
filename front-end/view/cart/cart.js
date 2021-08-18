//déclaration de la variable products qui contiendra les clés productReadyToBuy 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit"));

//affichage du nombre d'articles dans le localStorage sur la page du panier
let lengthOfProductsInCart = document.getElementById('cardProductsLength');
if(listOfProductStorage==null) {
  lengthOfProductsInCart.innerHTML += "Il ne contient pas d'articles." ;
} else{
  lengthOfProductsInCart.innerHTML += `Il contient ${listOfProductStorage.length} articles.` ;
} ;


//récupération des id des produits dans la base de données
fetch("http://localhost:3000/api/teddies/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (listArticle) {
    const listOfId = [];
    for (let article of listArticle) {
      listOfId.push(article._id);
    };
    //filtrer la liste des articles dans le localStorage
    for (let id of listOfId) {
      let articlesInCartPage = document.getElementById("articlesInCart") ;
      let idInLocalStorage = listOfProductStorage.filter(listOfProductStorage => listOfProductStorage.id == id);
      articlesInCartPage.innerHTML += `
                                            <article class="card mb-3" id="${idInLocalStorage[0].id}">
                                              <div class="row g-1">
                                                <div class="col-md-4">
                                                  <img src="${idInLocalStorage[0].image}" class="card-img" alt=" Ours en peluche nommé ${idInLocalStorage[0].name}">
                                                </div>
                                                <div class="col-md-8">
                                                  <div class="card-body d-flex justify-content-between align-items-baseline">
                                                    <div>
                                                      <h4 class="card-title h2 fw-bold">${idInLocalStorage[0].name}</h4>
                                                    </div>
                                                    <div>
                                                      <p class="card-text fw-bold h5">Sous total : <span class="fw-normal">${(idInLocalStorage[0].price/100)*idInLocalStorage.length}€</span></p>
                                                      <div class="d-flex align-items-baseline">
                                                        <button type="button" class="btn btn-success me-1" id="btnAddProduct"><i class="far fa-plus-square"></i></button>
                                                        <p class="card-text fw-bold me-2 h5">Quantité : <span class="fw-normal">${idInLocalStorage.length}</span></p>
                                                        <button type="button" class="btn btn-danger" id="btnDeleteProduct"><i class="far fa-minus-square"></i></button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </article>`
    }
    const egd = document.getElementById("articlesInCart") ;
    console.log(egd) ;
  })
  .catch(function(err) {
    console.error(err) ;
  }) ;
   

  