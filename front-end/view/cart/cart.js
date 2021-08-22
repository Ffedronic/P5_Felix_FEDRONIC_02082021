//déclaration de la variable products qui contiendra les clés productReadyToBuy 
let listOfProductStorage = JSON.parse(localStorage.getItem("produit"));

//affichage du nombre d'articles dans le localStorage sur la page du panier
let lengthOfProductsInCart = document.getElementById('cardProductsLength');
if(listOfProductStorage==null) {
  lengthOfProductsInCart.innerHTML += "Il ne contient pas d'articles." ;
} else{
  lengthOfProductsInCart.innerHTML += `Il contient ${listOfProductStorage.length} articles.` ;
} ;




