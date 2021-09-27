//---------------------------------déclaration des variables---------------------------------------// 

/*déclaration de la variable listOfProductStorage contenant les produits dans la clé produit du
 localStorage*/
var listOfProductStorage = JSON.parse(localStorage.getItem("produit"));


/*création de la variable number contenant le prix total de la commande*/
var productsTotalPrice = 0;

/*création de la variable number contenant la quantité totale de produit*/
var productsQuantities = 0;

/*selection de l'emplacement d'affichage des produits*/
var displayProductsInCart = document.getElementById("DisplayArticlesInCart");

/*selection de l'emplacement du nombre de produits*/
const displayProductsLengthInCart = document.getElementById('cardProductsLength');

/*selection de l'emplacement du total de la commande*/
const displayProductsTotalAmountInCart = document.getElementById('totalAmount');

/*sélection de l'emplacement du formulaire*/
const displayProductsFormOrderInCart = document.getElementById("formOrder");

/**
 * * les url d'envoi Post order et le localSotrage, localisation de la page de confirmation 
 */
const urlSendOrder = "http://localhost:3000/api/teddies/order";
const urlConfirmationPage = "/front-end/view/order/order.html";

/**
 * *Variables regex des controles du formulaire
 */
const regexCityName = /^[ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ\w-]{3,30}$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexAddress = /^[\w\d\s]{3,80}$/;

//--------------------affichage des produits dans la page panier-----------------------------------//


/*fonction d'affichage du formulaire de contact (paramètre : emplacement de l'affichage du formulaire*/
function DisplayForm(displayFormLocation) {

  /*affichage du formulaire de contact*/
  displayFormLocation.innerHTML =
    `
      <form class="border rounded bg-light p-2">
        <h2 class="mb-3 text-center">Formulaire de commande</h2>
        <div class="form-group mb-3 text-center">
          <label class="h3" for="email">Email :</label>
          <input type="email" class="form-control" id="email" placeholder="nom@exemple.fr" required>
        </div>
        <div class="form-group mb-3 text-center">
          <label for="firstName" class="h3">Prénom :</label>
          <input type="text" class="form-control" id="firstName" aria-label="Entrez votre prénom" required>
        </div>
        <div class="form-group mb-3 text-center">
          <label for="lastName" class="h3">Nom :</label>
          <input type="text" class="form-control" id="lastName" required>
        </div>
        <div class="form-group mb-3 text-center text-center">
          <label class="h3" for="adress">Adresse :</label>
          <input type="text" class="form-control" id="adress" placeholder="ex : 78 chemin des oursons" required>
        </div>
        <div class="form-group mb-3 text-center">
          <label class="h3" for="city">Ville</label>
          <input type="text" class="form-control" id="city" required>
        </div>
        <button type="submit" id="btnSubmit" class="btn btn-info mt-3"><span class="h4 fw-bold">Valider la commande</span></button>
      </form>
    `;
  //récupération du bouton de validation de commande
  const btnSubmit = document.getElementById("btnSubmit");
};

/**
 * *fonction d'envoi de l'objet contenant les valeurs du formulaire de contact, les id des produits du panier, le montant total de la commande
 * * (paramètres : liste des produits, objet json avec les valeurs du formulaire et les id produits, le montant total de la commande)
 * */
function SendContactProductsId(urlToSend, FormContactProductsId, OrderTotalPrice, urlConfirmationPage) {
  //envoi de l'objet contactProductsToSend au serveur via fetch api avec la méthode POST
  fetch(urlToSend, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(FormContactProductsId),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((responseServer) => {
      //création et stockage dans le localStorage de l'objet responseServerContact contenant l'objet contact renvoyé par le serveur
      const responseServerContact = responseServer.contact;
      localStorage.setItem("responseServerContact", JSON.stringify(responseServerContact));
      //création et stockage dans le localStorage de l'objet responseServerProducts contenant l'objet products renvoyé par le serveur
      const responseServerProducts = responseServer.products;
      localStorage.setItem("responseServerProducts", JSON.stringify(responseServerProducts));
      //création et stockage dans le localStorage de l'objet responseServerOrderId contenant l'objet orderId renvoyé par le serveur
      const responseServerOrderId = responseServer.orderId;
      localStorage.setItem("responseServerOrderId", JSON.stringify(responseServerOrderId));
      //stockage dans le localStorage de l'objet productsTotalPrice contenant le montant total de la commande
      localStorage.setItem("productsTotalPrice", JSON.stringify(OrderTotalPrice));
      window.location.assign(urlConfirmationPage) ;
    })
    .catch((err) => {
      console.log(err);
    })
};

/**
 * *Fonction de test des valeurs des contrôles de formulaire
 */
function ControlValues(regex, value) {
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
};

/*fonction de récupération des valeurs du formulaire de contact et les id des produits du panier (paramètre : liste des produits)*/
function CollectContactProductsId(productsList) {

  //au clic sur le bouton de validation de commande
  btnSubmit.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();

    //récupération des valeurs des controles du formulaire
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var adress = document.getElementById("adress").value;
    var city = document.getElementById("city").value;
    var email = document.getElementById("email").value;

    if(!ControlValues(regexEmail, email)) {
      alert("L'e-mail : adresse mail non valide.") ;
    }
    else if(!ControlValues(regexCityName, firstName)) {
     alert("Le prénom : au moins 3 lettres et pas de caractères spéciaux.") ;
    }
    else if(!ControlValues(regexCityName, lastName)) {
     alert("Le nom : au moins 3 lettres et pas de caractères spéciaux.") ;
    }
    else if(!ControlValues(regexAddress, adress)) {
     alert("Adresse : adresse de livraison non valide.") ;
    }
    else if(!ControlValues(regexCityName, city)){
      alert("Ville : au moins 3 lettres et pas de caractères spéciaux.")
    } 
    else {
    console.log("ok");
      //création de l'objet contact contenant les valeurs des contrôles du formulaire
      const contact = {
        firstName: firstName,
        lastName: lastName,
        address: adress,
        city: city,
        email: email
      };

      //création du tableau products contenant les id des produits contenus dans le localStorage
      const products = [];
      productsList.forEach(element => {
        products.push(element.id);
      });

      //création de l'objet à envoyer au serveur contenant la liste des produits achetés et les valeurs validées des champs formulaire de contact
      const contactProductsToSend = {
        contact,
        products
      };

      var orderAmount = document.getElementById("totalAmount").innerHTML;
      /**
       * ! Appel de la fonction d'affichage d'envoi du formulaire, le total commande, vers le serveur et la réponse du serveur vers la page de confirmation 
       * ! (paramètres : url d'envoi post, objet json avec les valeurs du formulaire et les id produits, le montant total de la commande, page de confirmation)
       */
      SendContactProductsId(urlSendOrder, contactProductsToSend, orderAmount, urlConfirmationPage);
    }
  });
};

/* fonction d'affichage des produits présents dans le localStorage (paramètres : liste des produits, emplacemement d'affichage de la liste, emplacemement d'affichage de la quantité, emplacemement d'affichage du montant total de la commande)*/
function DisplayProductsLocalStorage(productsList, productsListDisplayLocation, productsListDisplayLength, productsListDisplayTotalAmount) {
  //si le localStorage ne contient pas de produit
  if (productsList == null || productsList == 0) {
    productsListDisplayLength.innerHTML = `<h2>Le panier est vide.</h2>`;
    productsListDisplayTotalAmount.innerHTML = 0;
  }
  //si le localStorage contient des produits
  else {

    /*création du tableau contenant les corps html des produits à afficher*/
    let displayProducts = [];

    for (let product of productsList) {
      //quantité de produit
      productsQuantities += product.quantity;
      //montant total de la commande :
      productsTotalPrice += (product.price / 100) * product.quantity;
      //création des éléments à afficher pour chaque produit
      displayProducts += `
      <article class="card mb-3" id="articleProduct${product.id}">
        <div class="row">
          <div class="col-sm-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name} peluche faite main">
          </div>
          <div class="col-12 col-sm-8">
            <div class="card-body">
              <h3 class="card-title fw-bold">${product.name}</h3>
              <div class="d-flex justify-content-between">
                <div>
                  <div class="d-md-flex">
                  <h4 class="card-text me-md-2" id="quantityProduct">Quantité :</h4>
                  <h5>
                    <span>
                      <a class="btn btn-success p-1 me-2" id="${product.id}" data-productid="${product.id}" data-quantity="1" aria-label="augmenter la quantité du produit ${product.name}">
                        <i class="fas fa-plus-square" data-productid="${product.id}" data-quantity="1"></i>
                      </a>
                    </span>
                    <span id="productQuantity${product.id}" class="me-2">${product.quantity}</span>
                    <span>
                      <a class="btn btn-warning p-1" id="decreaseProduct${product.id}" data-productid="${product.id}" data-quantity="-1" aria-label="diminuer la quantité du produit ${product.name}">
                        <i class="fas fa-minus-square 11" data-productid="${product.id}" data-quantity="-1"></i>
                      </a>
                    </span>
                  </h5>
                  </div>
                  <h5 class="card-text">Prix :<span id="subtotalProduct${product.id}">${(product.price/100)*product.quantity}<span>€</h5>
                </div>
                <button style="height : 50px;" type="button" class="btn btn-danger fw-bold" id="button${product.id}" data-productid="${product.id}" data-quantity="0" aria-label="supprimer le produit ${product.name}">
                  <i class="fas fa-trash-alt text-white" data-productid="${product.id}" data-quantity="0"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      `;
    }
    //affichage de la quantité totale de produits dans le localStorage
    productsListDisplayLength.innerHTML = `<h2>Le panier contient <span id="productsLength">${productsQuantities}</span> ours.</h2>`;
    //affichage des produits sur la page panier
    productsListDisplayLocation.innerHTML=  displayProducts;
    //affichage du montant total de la commande
    productsListDisplayTotalAmount.innerHTML = `${productsTotalPrice}`;

    /**
     * ! Appel de la fonction DisplayFOrm
     */
    DisplayForm(displayProductsFormOrderInCart);

    /**
     * ! Appel de la fonction CollectContactProductsId
     */
    CollectContactProductsId(listOfProductStorage);

  };
};

/**
 * ! Appel de la fonction d'affichage des produits présents dans le localStorage 
 * ! (paramètres : liste des produits LocalStorage, emplacemement d'affichage de la liste, emplacemement d'affichage de la quantité, emplacemement d'affichage du montant total de la commande)
 */
DisplayProductsLocalStorage(listOfProductStorage, displayProductsInCart, displayProductsLengthInCart, displayProductsTotalAmountInCart);



//----------------------------modification de la quantité par article----------------------------------------//

/**
 * * Fonction de modification des quantités selon les attributs data des boutons de modification de quantité
 */
function handleButtonClick(event) {

  productsList = JSON.parse(localStorage.getItem("produit")) ;
  /**
   * *Récupération de la cible bouton
   */
  let button = event.target;
  /**
   * *Récupération du data-quantity de la cible bouton
   */
  let quantity = button.dataset.quantity * 1;
  event.preventDefault;
  event.stopPropagation;
  /**
   * *Si le panier localStorage contient un élément
   */
  if (productsList !== null) {
    /**
     * *pour chaque élément de la liste de produits du panier,
     */
    productsList.forEach(element => {
      /**
       * *si l'id de l'élément correspond au data-productid de la cible bouton
       */
      if (element.id == event.target.dataset.productid) {
        var productsElements, totalAmount;

        /**
         * ! Si la data-quantity est égale à 0
         */
        if (quantity == 0) {

          element.quantity = 0 ;

          /**
           * *Sinon,
           */
        } else {
          /**
           * *On ajoute la data-quantity de la cible bouton à la quantité de l'élément
           */
          element.quantity = element.quantity + quantity;
          /**
           * *La liste des produits du panier mise à jour est stockée dans le localStorage associée à la clé produit
           */
          localStorage.setItem("produit", JSON.stringify(productsList));
          /**
           * *L'affichage de la quantité totale des articles est mis à jour
           */
          productsElements = parseInt(document.getElementById("productsLength").innerHTML) + quantity;
          document.getElementById("productsLength").innerHTML = productsElements;
          /**
           * *L'affichage du montant total de la commande est mis à jour
           */
          totalAmount = parseInt(document.getElementById("totalAmount").innerHTML) + ((quantity * element.price) / 100);
          document.getElementById("totalAmount").innerHTML = totalAmount;
          /**
           * *L'affichage de la quantité de l'élément est mis à jour
           */
          document.getElementById("productQuantity" + element.id).innerHTML = element.quantity;
          /**
           * *L'affichage du montant à payer pour l'élément est mis à jour
           */
          document.getElementById("subtotalProduct" + element.id).innerHTML = `${(element.price/100)*element.quantity} €`;
        }
        /**
         * ! Si la quantité de l'élément est inférieur ou égale à 0
         */
        if (element.quantity <= 0) {
          /**
           * *La quantité du produit est soustraite à la quantité de produits présents dans le panier
           */
           productsElements = parseInt(document.getElementById("productsLength").innerHTML) - parseInt(document.getElementById("productQuantity" + element.id).innerHTML);
           document.getElementById("productsLength").innerHTML = productsElements;
           /**
            * *Le prix égal à la quantité du produit est soustrait au montant total de la commande
            */
           totalAmount = parseInt(document.getElementById("totalAmount").innerHTML) - parseInt(document.getElementById("subtotalProduct" + element.id).innerHTML);
           document.getElementById("totalAmount").innerHTML = totalAmount;
           /**
            * *L'affichage du produit est supprimé de la page panier
            */
           var article = document.getElementById("articleProduct" + element.id);
           displayProductsInCart.removeChild(article);
           /**
            * *Le produit est supprimé de la liste des produits présents dans le panier et le nouveau panier est stocké dans le localStorage
            */
           productsList = productsList.filter(element => element.id != event.target.dataset.productid);
           localStorage.setItem("produit", JSON.stringify(productsList));

          /**
           * ! Si la quantité de produits présents dans le panier ou le montant total de la commande est égal à 0
           */
          if (productsElements <= 0 || totalAmount <= 0) {
            /**
             * * La quantité de produits présents dans le panier affiche "vide"
             */
            displayProductsLengthInCart.innerHTML = `<h2>Le panier est vide.<h2>`;
            /**
             * * L'emplacement de l'affichage des produits présents dans le panier est supprimé
             */
            var displayCart = document.getElementById("displayCart");
            displayCart.removeChild(displayProductsInCart);
            /**
             * * Le montant total de la commande affiche 0€
             */
            var displayAmount = document.getElementById("displayAmount");
            displayAmount.innerHTML = `<h2>Montant total : 0 €</h2>`;
            /**
             * *Le formulaire est supprimé de la page du panier
             */
            var cart = document.getElementById("cart");
            cart.removeChild(displayProductsFormOrderInCart);
          }
        };
      };
    });
  }
};

/**
 * *Récupération de la liste des boutons "-" la quantité du produit
 */
const btnDecreaseProductQuantity = document.querySelectorAll(".btn-warning");

/**
 * *fonction de diminution de la quantité du produit (paramètres : liste des boutons "-" la quantité des produits, liste des produits du panier)
 */
function DecreaseProductQuantity(productsButtonDecreaseQuantity) {
  productsButtonDecreaseQuantity.forEach(btnDeleteQelement => {
    btnDeleteQelement.addEventListener('click', event => {
      handleButtonClick(event)
    });
  });
};

/**
 * *Récupération de la liste des boutons "+" la quantité du produit
 */
const btnIncreaseProductQuantity = document.querySelectorAll(".btn-success");

/**
 * *fonction d'augmentation de la quantité du produit (paramètres : liste des boutons "+" la quantité des produits, liste des produits du panier)
 */
function IncreaseProductQuantity(productsButtonIncreaseQuantity) {
  productsButtonIncreaseQuantity.forEach(btnAddElement => {
    btnAddElement.addEventListener('click', event => {
      handleButtonClick(event)
    });
  });
}

/**
 * *Récupération de la liste des boutons "supprimer" du produit
 */
const btnDeleteProduct = document.querySelectorAll(".btn-danger");

/**
 * *fonction de suppression du produit (paramètres : liste des boutons "supprimer"  des produits, liste des produits du panier)
 */
function DeleteProduct(productsButtonDelete) {
  productsButtonDelete.forEach(btnDeleteElement => {
    //au click
    btnDeleteElement.addEventListener('click', event => {
      handleButtonClick(event);
    });
  });
};

/**
 * ! Appel de la fonction DecreaseProductQuantity (paramètres : liste des boutons "-" la quantité des produits, liste des produits du localStorage)
 */
DecreaseProductQuantity(btnDecreaseProductQuantity);

/**
 * ! Appel de la fonction IncreaseProductQuantity (paramètres : liste des boutons "+" la quantité des produits, liste des produits du localStorage)
 */
IncreaseProductQuantity(btnIncreaseProductQuantity);

/**
 * ! Appel de la fonction de suppression du produit (paramètres : liste des boutons "supprimer"  des produits, liste des produits du localStorage)
 */
DeleteProduct(btnDeleteProduct);