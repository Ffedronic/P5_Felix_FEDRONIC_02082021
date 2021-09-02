
  //création de l'objet contact contenant les valeurs des contrôles du formulaire
  const contact = {
    firstName : document.getElementById("firstName").value,
    lastName : document.getElementById("lastName").value,
    address : document.getElementById("adress").value,
    city : document.getElementById("city").value,
    email : document.getElementById("email").value
  } ;
  //création du tableau products contenant les id des produits contenus dans le localStorage
 const products = [] ;
 listOfProductStorage.forEach(element => {
   products.push(element.id) ;
 }) ;
 const contactProductsToSend = {contact, products} ;
 console.log(contactProductsToSend) ;