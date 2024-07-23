//get products
let productId = localStorage.getItem("productId");
let productDetails = document.querySelector(".item-details");
(function drawProductsUI(){
    fetch(`https://fakestoreapi.com/products`)
    .then(res=>res.json())
    .then(data=> {
        productDetails.innerHTML = `
                <img src="${data[productId - 1].image}" alt="${data[productId].title}">
                <a class="product-title">${data[productId].title}</a>
                <p class="product-desc">${data[productId].description}</p>
                <p class="product-cat">Category: <span>${data[productId].category}</span></p>
                <p class="product-price">Price: <span>$${data[productId].price}</span></p>
            `;
    })
    .catch(error => console.error('Error fetching data:', error));
})()

// Edit Product
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}
