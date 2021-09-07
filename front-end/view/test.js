//récupération des données de la fiche produit
let btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault;
  let productReadyToBuy = {
    id: productElements._id,
    image: productElements.imageUrl,
    name: productElements.name,
    price: productElements.price,
    quantity: 1
  };

  //déclaration de la variable products qui contiendra les clés productReadyToBuy 
  let products = JSON.parse(localStorage.getItem("produit"));
  ///s'il y a des produits dans la variable products
  if (products != null) {
    var found = false;
    products.forEach(element => {
      if (element.id == productReadyToBuy.id) {
        element.quantity = element.quantity + 1;
        found = true;
      }
    });
    if (!found) {
      products.push(productReadyToBuy);
    }
    localStorage.setItem("produit", JSON.stringify(products));
    console.log(products);
    ///s'il n'y a pas de produits dans la variable products
  } else {
    products = [];
    products.push(productReadyToBuy);
    localStorage.setItem("produit", JSON.stringify(products));
    console.log(products);
  };
});