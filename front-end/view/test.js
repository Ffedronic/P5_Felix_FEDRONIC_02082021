displayProductsInCart.innerHTML += `
      <article class="card mb-3" id="${displayProductsById[0].id}" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${displayProducts.image}" class="img-fluid rounded-start" lt="peluche fait main ${displayProducts.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">${displayProducts.name}</h2>
              <p>Quantité : ${displayProductsById.length}</p>
              <p class="card_text">Sous-total : <span class="fw-bold">${(displayProducts.price/100)*displayProductsById.length}€</span></p>
              <button type="button" id="btnDelete" class="btn btn-danger">Supprimer</button>
            </div>
          </div>
        </div>
      </article>` 
    ;