/**
 * *Récupération de l'objet responseServerContact du local storage
 */
const responseServerContact = JSON.parse(localStorage.getItem("responseServerContact")) ;

/**
 * *Récupération de l'objet responseServerProducts du local storage
 */
const responseServerProducts = JSON.parse(localStorage.getItem("responseServerProducts")) ;

/**
 * *Récupération de l'objet responseServerOrderId du local storage
 */
const responseServerOrderId = JSON.parse(localStorage.getItem("responseServerOrderId")) ;

/**
 * *Récupération de l'objet responseServerOrderId du local storage
 */
const orderTotalPrice = JSON.parse(localStorage.getItem("productsTotalPrice")) ;

/**
 * * Création de la variable de positionnement du la confirmation de commande
 */
var validateOrder = document.getElementById("validateOrder") ;

/**
 * *Fonction pour l'affichage de la validation de commande
 */
function DisplayOrderValidation(validationPosition, contact, orderId, orderAmount) {
    validationPosition.innerHTML = 
    `
        <h1 class="mt-5">Votre commande a bien été validée !</h1>
        <p class="h4 mt-5">Votre commande <span class="fw-bold">"${orderId}"</span> du montant de <span class="fw-bold">${orderAmount} €</span> a bien été prise en compte.</p>
        <p class="h4 mt-5">Le récapitulatif de votre commande vous a été joint à l'adresse mail suivante : <span class="fw-bold">${contact.email}</span></p>
        <p class="h4 mt-5 mb-4">Elle vous sera bientôt livrée à l'adresse indiquée :</p>
        <p class="h4 text-uppercase"><span class="fw-bold">${contact.firstName} ${contact.lastName}</span>,</p>
        <p class="h4 text-uppercase"><span class="fw-bold">${contact.address}</span>,</p>
        <p class="h4 text-uppercase"><span class="fw-bold">${contact.city}</span>.</p>
        <p class="h4 mt-5 mb-5">Merci et à bientôt !</p>
        <div class="text-center">
            <button id="btnHomeReturn" class="btn btn-success mb-5" type="reset"><span class="h3">Retour à la liste des oursons</span></button>
        </div> 
    ` 
;
} ;

/**
 * !appel de la fonction DisplayOrderValidation
 */
DisplayOrderValidation(validateOrder, responseServerContact, responseServerOrderId, orderTotalPrice) ;

/**
 * *Fonction de retour à la page d'accueil
 */
function ReturnHome() {
    localStorage.removeItem("produit");
    localStorage.removeItem("productsTotalPrice");
    localStorage.removeItem("responseServerContact");
    localStorage.removeItem("responseServerProducts");
    localStorage.removeItem("responseServerOrderId");
    return window.location.assign("/front-end/view/home/index.html");
} ;

/**
 * Si le client fait un retour en arrière,
 */
window.addEventListener('unload', ReturnHome) ;

//récupération du click sur le bouton retour à list des oursons
btnHomeReturn = document.getElementById("btnHomeReturn") ;
btnHomeReturn.addEventListener("click", ReturnHome) ;
