fetch("http://localhost:3000/api/teddies/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(listArticle) {
    console.log(listArticle);
    document.getElementById('article-length').innerHTML += `(${listArticle.length} articles)` ; 
    for(let article of listArticle) {
        document.getElementById('articles-group').innerHTML += `<article class="card m-2" id="${article._id}" style="width: 20em;">
                                                                    <img src="${article.imageUrl}" alt="${article.name} ours en peluce fait main">
                                                                    <div class="card-body">
                                                                        <h3 class="card-title">${article.name}</h3>
                                                                        <p class="card-text">${article.description}</p>
                                                                        <a href="#" class="btn btn-primary">Détails</a>
                                                                    </div>
                                                                </article>`
    };
    document.getElementById('color')
  })
  .catch(function(err) {
    // Une erreur est survenue
  });