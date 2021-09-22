//affichage des produits sur la page d'accueil à partir de la promesse issue du fetch
function DisplayDownloadProducts(listDownloadedProducts) {
  document.getElementById('article-length').innerHTML += `<h2>(${listDownloadedProducts.length} articles)</h2>`;
  for (let article of listDownloadedProducts) {
    document.getElementById('articles-group').innerHTML +=
      `
        <article class="card m-3" id="${article._id}">
          <img  class=" card-img card-img-top img-fluid" src="${article.imageUrl}" alt="${article.name} ours en peluche fait main"> 
          <div class="card-body text-center">
              <h3 class="card-title">${article.name}</h3>
              <p class="card-text">${article.description}</p>
          </div>
          <div class="card-footer text-center">
            <a href="/front-end/view/product/product.html?id=${article._id}" class="btn btn-primary">Voir l'article</a>
          </div>
        </article>
      `
  };
};

//fonction de récupération des produits via fetch api
function DownloadProducts(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(DisplayDownloadProducts)
    .catch(function (err) {
      console.log(err);
    });
};

//création de la variable url contenant la route 
var url = "http://localhost:3000/api/teddies/";

//appel de la fonction pour télécharger et afficher les produits disponibles dans la base de données
DownloadProducts(url);