let productsDom = document.querySelector(".product-list");
let total = document.querySelector(".total");
// console.log(noProductsDom)


function drawCartProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsInCart")).length === 0){
    productsDom.innerHTML = `<h2 class="no-products">there is no items 🤷‍♂️</h2>`;
    total.innerHTML= `total : $${sumTotal()}`
  } else {
    let products = JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
    total.innerHTML= `total : $${sumTotal(products)}`
    console.log(products)
    let productsUI = products.map((item) => {
    return `
      <div class="product-box">
        <img src="${item.image}" alt="${item.title}">
        <a onclick="saveItemData(${item.id})" class="product-title">${item.title.slice(0,11)}</a>
        <p class="product-desc">${item.description.slice(0,75)}</p>
        <p class="product-cat">Category: <span>${item.category}</span></p>
        <p class="product-price">Price: <span>$${item.price}</span></p>
        <p class="product-price">Quantity: <span>${item.qty}</span></p>
        <div class="product-btn">
            <button class="del" id="add-cart" onclick="removeItemFromCart(${item.id})"><i class="bi bi-trash"></i></button>
        </div>
      </div>
      `;
  });
  return productsDom.innerHTML = productsUI;
  }
}
drawCartProductsUI();

function sumTotal(products=[]){
  return products.reduce((total, item) => total + item.price, 0);
}

function removeItemFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let filteredItems = items.filter((item) => item.id !== id);
    sumTotal(filteredItems);
    localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
    drawCartProductsUI(filteredItems);
  }
}

//Save Data to send to cartDetails page
function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}