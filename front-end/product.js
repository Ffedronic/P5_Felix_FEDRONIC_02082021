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

fetch(`http://localhost:3000/api/teddies/${id}`)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
.then(function(articlDetails) {
    console.log(articlDetails) ;
})