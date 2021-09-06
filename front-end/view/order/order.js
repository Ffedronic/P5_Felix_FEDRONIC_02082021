//récupération de l'objet responseServerContact du local storage
const responseServerContact = JSON.parse(localStorage.getItem("responseServerContact")) ;
//récupération de l'objet responseServerProducts du local storage
const responseServerProducts = JSON.parse(localStorage.getItem("responseServerProducts")) ;
//récupération de l'objet responseServerOrderId du local storage
const responseServerOrderId = JSON.parse(localStorage.getItem("responseServerOrderId")) ;
//récupération de l'objet responseServerOrderId du local storage
const orderTotalPrice = JSON.parse(localStorage.getItem("productsTotalPrice")) ;

//affichage de la validation de la commande
var validateOrder = document.getElementById("validateOrder") ;
validateOrder.innerHTML = 
    `
        <h1 class="mt-5">Votre commande a bien été validée !</h1>
        <p class="h4 mt-5">Votre commande <span class="fw-bold">"${responseServerOrderId}"</span> du montant total de <span class="fw-bold">${orderTotalPrice} €</span> a bien été prise en compte.</p>
        <p class="h4 mt-5">Le récapitulatif de votre commande vous a été joint à l'adresse mail suivante : <span class="fw-bold">${responseServerContact.email}</span></p>
        <p class="h4 mt-5 mb-4">Elle vous sera bientôt livrée à l'adresse indiquée :</p>
        <p class="h4 text-uppercase"><span class="fw-bold">${responseServerContact.firstName} ${responseServerContact.lastName}</span>,</p>
        <p class="h4 text-uppercase"><span class="fw-bold">${responseServerContact.address}</span>,</p>
        <p class="h4 text-uppercase"><span class="fw-bold">${responseServerContact.city}</span>.</p>
        <p class="h4 mt-5 mb-5">Merci et à bientôt !</p>
        <div class="text-center">
        <button id="btnHomeReturn" class="btn btn-success mb-5" type="reset"><span class="h3">Retour à la liste des oursons</span></button>
        </div> 
    ` 
;

function returnHome() {
    localStorage.removeItem("produit");
    localStorage.removeItem("productsTotalPrice");
    localStorage.removeItem("responseServerContact");
    localStorage.removeItem("responseServerProducts");
    localStorage.removeItem("responseServerOrderId");
    window.location.assign("/front-end/view/home/index.html");
} ;

//récupération du click sur le bouton retour à list des oursons
btnHomeReturn = document.getElementById("btnHomeReturn") ;
btnHomeReturn.addEventListener("click", returnHome) ;