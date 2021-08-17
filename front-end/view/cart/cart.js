//déclaration de la variable products qui contiendra les clés productReadyToBuy 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit")) ;

//affichage du nombre d'articles dans le localStorage sur la page du panier
let lengthOfProductsInCart = document.getElementById('cardProductsLength') ;
lengthOfProductsInCart.innerHTML += `Il contient ${listOfProductStorage.length} articles.` ;


//récupération des id des produits dans la base de données
fetch("http://localhost:3000/api/teddies/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(listArticle) {
      const listOfId = [] ;
      for(let article of listArticle) {
        listOfId.push(article._id) ;
      } ;
      //filtrer la liste des articles dans le localStorage
      for(let id of listOfId) {
        const idInLocalStorage = listOfProductStorage.filter(listOfProductStorage => listOfProductStorage.id == id ) ;
        console.log(idInLocalStorage) ;
      };
  })

