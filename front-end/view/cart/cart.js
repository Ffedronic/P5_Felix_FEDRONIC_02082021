//---------------------------------déclaration des variables---------------------------------------// 

/*déclaration de la variable listOfProductStorage contenant les produits dans la clé produit du localStorage*/
var listOfProductStorage = JSON.parse(localStorage.getItem("produit"));

/*création de la variable number contenant le prix total de la commande*/
var productsTotalPrice = 0;

/*création de la variable number contenant la quantité totale de produit*/
var productsQuantities = 0;

/*selection de l'emplacement d'affichage des produits*/
const displayProductsInCart = document.getElementById("DisplayArticlesInCart");

/*selection de l'emplacement du nombre de produits*/
const displayProductsLengthInCart = document.getElementById('cardProductsLength');

/*selection de l'emplacement du total de la commande*/
const displayProductsTotalAmountInCart = document.getElementById('totalAmount');

/*sélection de l'emplacement du formulaire*/
const displayProductsFormOrderInCart = document.getElementById("formOrder");

//--------------------affichage des produits dans la page panier-----------------------------------//

/**
 * 
 * * les url d'envoi Post order et le localSotrage, localisation de la page de confirmation 
 */
const urlSendOrder = "http://localhost:3000/api/teddies/order";
const urlConfirmationPage = "/front-end/view/order/order.html";

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
    })
    .catch((err) => {
      console.log(err);
    })
  setTimeout(() => {
    window.location.assign(urlConfirmationPage)
  }, 2000);

};


/*fonction de récupération des valeurs du formulaire de contact et les id des produits du panier (paramètre : liste des produits)*/
function CollectContactProductsId(productsList) {
  const contact = {};
  const products = [];

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

    //l'expression de fonction regex pour tester les variables firstName, lastName et city
    const regexTestNameAndCity = (element) => {
      return /^[ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ\w-]{3,30}$/.test(element);
    };

    //fonction de controle de la valeur firstName
    function firstNameControl() {
      if (regexTestNameAndCity(firstName)) {
        return true;
      } else {
        return false;
      };
    }

    //fonction de controle de la valeur firstName
    function lastNameControl() {
      if (regexTestNameAndCity(lastName)) {
        return true;
      } else {
        return false;
      };
    }

    //fonction de controle de la valeur firstName
    function cityControl() {
      if (regexTestNameAndCity(city)) {
        return true;
      } else {
        return false;
      };
    }

    //fonction de controle de la valeur email
    function emailControl() {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return true;
      } else {
        return false;
      };
    }

    //fonction de controle de la valeur adress
    function adressControl() {
      if (/^[\w\d\s]{3,80}$/.test(adress)) {
        return true;
      } else {
        return false;
      };
    }

    if (firstNameControl() && lastNameControl() && cityControl() && emailControl() && adressControl()) {
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

      /**
       * ! Appel de la fonction d'affichage d'envoi du formulaire, le total commande, vers le serveur et la réponse du serveur vers la page de confirmation 
       * ! (paramètres : url d'envoi post, objet json avec les valeurs du formulaire et les id produits, le montant total de la commande, page de confirmation)
       */
      SendContactProductsId(urlSendOrder, contactProductsToSend, productsTotalPrice, urlConfirmationPage);
    } else {
      console.log("ko");
      alert("remplissez correctement tous les champs du formulaire.")
    }
  });
};

/* fonction d'affichage des produits présents dans le localStorage (paramètres : liste des produits, emplacemement d'affichage de la liste, emplacemement d'affichage de la quantité, emplacemement d'affichage du montant total de la commande)*/
function DisplayProductsLocalStorage(productsList, productsListDisplayLocation, productsListDisplayLength, productsListDisplayTotalAmount) {
  //si le localStorage ne contient pas de produit
  if (productsList == null || productsList == 0) {
    productsListDisplayLength.innerHTML = `<h2>Le panier est vide.</h2>`;
  }
  //si le localStorage contient des produits
  else {

    /*création du tableau contenant les corps html des produits à afficher*/
    let displayProducts = [];

    for (let product of productsList) {
      //quantité de produit
      productsQuantities += product.quantity;
      //création des éléments à afficher pour chaque produit
      displayProducts += `
      <article class="card mb-3" id="articleProduct${product.id}">
        <div class="row">
          <div class="col-sm-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name} peluche faite main" style="min-height: 150px;">
          </div>
          <div class="col-12 col-sm-8">
            <div class="card-body">
              <h3 class="card-title">${product.name}</h3>
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-text" id="quantityProduct">Quantité :</h5>
                  <h5>
                    <span>
                      <button type="button" class="btn btn-success p-1 me-2" id="${product.id}" data-productid="${product.id}" data-quantity="1">
                        <i class="fas fa-plus-square" data-productid="${product.id}" data-quantity="1"></i>
                      </button>
                    </span>
                    <span id="productQuantity${product.id}" class="me-2">${product.quantity}</span>
                    <span>
                      <button type="button" class="btn btn-warning p-1" id="decreaseProduct${product.id}" data-productid="${product.id}" data-quantity="-1">
                        <i class="fas fa-minus-square 11" data-productid="${product.id}" data-quantity="-1"></i>
                      </button>
                    </span>
                  </h5>
                  <h5 class="card-text">Prix :<span id="subtotalProduct${product.id}">${(product.price/100)*product.quantity}<span>€</h5>
                </div>
                <button type="button" class="btn btn-danger fw-bold" id="button${product.id}" data-productid="${product.id}" data-quantity="0">
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
    productsListDisplayLength.innerHTML = `<h2>Le panier contient <span id="productsElements">${productsQuantities}</span> ours.</h2>`;
    //affichage des produits sur la page panier
    productsListDisplayLocation.innerHTML = displayProducts;
    //affichage du montant total de la commande
    productsListDisplayTotalAmount.innerHTML = `<h2 class="mb-5">Montant de la commande : <span class="h1 fw-bold" id="productsTotalPrice">${productsTotalPrice} €</span></h2>`;

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
 * * Fonction de modification au click
 */
function handleButtonClick(event, productsList) {
  let button = event.target;
  let quantity = button.dataset.quantity * 1;
  event.preventDefault;
  event.stopPropagation;
  if (productsList !== null) {
    productsList.forEach(element => {
      //si l'id du bouton correspond au produit dans le localStoraga
      if (element.id == event.target.dataset.productid) {
        //alors je diminue la quantité du produit dans le localStorage
        if (quantity == 0) {
          element.quantity = 0;
        } else {
          element.quantity = element.quantity + quantity;
          localStorage.setItem("produit", JSON.stringify(productsList));
          var productsElements = parseInt(document.getElementById("productsElements").innerHTML) + quantity;
          document.getElementById("productsElements").innerHTML = productsElements;
          document.getElementById("productQuantity" + element.id).innerHTML = element.quantity;
          document.getElementById("subtotalProduct" + element.id).innerHTML = `${(element.price/100)*element.quantity} €`;
        }
        //si la quantité du produit est égale ou inférieure à 0 alors je supprime le produit du localStorage
        if (element.quantity <= 0) {
          productsList = productsList.filter(element => element.id !== event.target.dataset.productid);
          localStorage.setItem("produit", JSON.stringify(productsList));
          var article = document.getElementById("articleProduct" + event.target.dataset.productid);
          article.parentNode.removeChild(article);
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
function DecreaseProductQuantity(productsButtonDecreaseQuantity, productsList) {
  productsButtonDecreaseQuantity.forEach(btnDeleteQelement => {
    btnDeleteQelement.addEventListener('click', event => {
      handleButtonClick(event, productsList)
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
function IncreaseProductQuantity(productsButtonIncreaseQuantity, productsList) {
  productsButtonIncreaseQuantity.forEach(btnDeleteQelement => {
    btnDeleteQelement.addEventListener('click', event => {
      handleButtonClick(event, productsList)
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
function DeleteProduct(productsButtonDelete, productsList) {
  productsButtonDelete.forEach(btnDeleteElement => {
    //au click
    btnDeleteElement.addEventListener('click', event => {
      handleButtonClick(event, productsList);
    });
  });
};

/**
 * ! Appel de la fonction DecreaseProductQuantity (paramètres : liste des boutons "-" la quantité des produits, liste des produits du localStorage)
 */
DecreaseProductQuantity(btnDecreaseProductQuantity, listOfProductStorage);

/**
 * ! Appel de la fonction IncreaseProductQuantity (paramètres : liste des boutons "+" la quantité des produits, liste des produits du localStorage)
 */
IncreaseProductQuantity(btnIncreaseProductQuantity, listOfProductStorage);

/**
 * ! Appel de la fonction de suppression du produit (paramètres : liste des boutons "supprimer"  des produits, liste des produits du localStorage)
 */
DeleteProduct(btnDeleteProduct, listOfProductStorage);