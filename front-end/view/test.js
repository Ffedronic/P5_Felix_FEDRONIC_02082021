productsList = productsList.filter(element => element.id != event.target.dataset.productid);
          console.log(typeof(productsList)) ;
          localStorage.setItem("produit", JSON.stringify(productsList));