let productsDom = document.querySelector(".product-list-love");
// let noProductsDom = document.querySelector(".no-products");
// console.log(noProductsDom)


function drawCartProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsInCartLove")).length === 0){
    return  productsDom.innerHTML = `<h2 class="no-products">there is no items 🤷‍♂️</h2>`;
  } else {
    let products = JSON.parse(localStorage.getItem("productsInCartLove")) || allProducts;
    console.log(products)
    let productsUI = products.map((item) => {
    return `
      <div class="product-box">
        <img src="${item.image}" alt="${item.title}">
        <a onclick="saveItemData(${item.id})" class="product-title">${item.title.slice(0,11)}</a>
        <p class="product-desc">${item.description.slice(0,88)}</p>
        <p class="product-cat">Category: <span>${item.category}</span></p>
        <p class="product-price">Price: <span>$${item.price}</span></p>

        <div class="product-btn">
            <button id="add-cart" class="del" onclick="removeItemFromCart(${item.id})"><i class="bi bi-trash"></i></button>
        </div>
      </div>
      `;
  });
  return productsDom.innerHTML = productsUI;
  }
    
}

drawCartProductsUI();

function removeItemFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCartLove");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsInCartLove", JSON.stringify(filteredItems));
    drawCartProductsUI(filteredItems);
  }
}

//Save Data to send to cartDetails page
function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}