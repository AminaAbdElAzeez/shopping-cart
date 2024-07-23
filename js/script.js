let productsDom = document.querySelector(".product-list");
let cartProductsMenu = document.querySelector(".carts-products")
let cartsProductsDivDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shopping-cart");
let badgeDom= document.querySelector(".badge-cart")

// Open cart Menue
shoppingCartIcon.addEventListener("click",openCartMenu)

//get products
let products=[];
function drawProductsUI(){
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data=> {
        products=data
        console.log(products)
        products.forEach(product => {
            product.qty=1;
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');
            productBox.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <a onclick="saveItemData(${product.id})" class="product-title">${product.title.slice(0,11)}</a>
                <p class="product-desc">${product.description.slice(0,75)}</p>
                <p class="product-cat">Category: <span>${product.category}</span></p>
                <p class="product-price">Price: <span>$${product.price}</span></p>

                <div class="product-btn">
                    <button id="add-cart" onclick="addedToCart(${product.id})">
                    <i class="bi bi-cart-plus"></i></button>
                    <button id="add-love" onclick="addedToLove(${product.id})">
                    <i class="bi bi-heart"></i>
                    </button>
                </div>
            `;
            productsDom.appendChild(productBox);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}
drawProductsUI()
//Check if there is items in localStorage
let addedItem=localStorage.getItem("productsInCart")
? JSON.parse(localStorage.getItem("productsInCart")) 
: [];

if(addedItem) {
    addedItem.map((item)=> {
        cartsProductsDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`
    });
    badgeDom.style.display="block";
    badgeDom.innerHTML += addedItem.length;
}

// Add To cart 
let allItems=[];
function addedToCart(id) {
    if (localStorage.getItem("username")) {
        let choosenItem = products.find((item) => item.id === id);
        let items =allItems.find((i)=>i.id=== choosenItem.id)

        if(items) {
            choosenItem.qty+=1;
        } else {
            allItems.push(choosenItem)
            console.log(allItems)
        }

        cartsProductsDivDom.innerHTML=""
        allItems.forEach(item=>{
            cartsProductsDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
        })

        addedItem = [...addedItem, choosenItem];

        let uniqueProducts = getUniqueArr(addedItem,"id")

        localStorage.setItem("productsInCart",JSON.stringify(uniqueProducts));
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductItems.length;
    } else {
        window.location = "signin.html";
    }
}

function getUniqueArr(arr, filterType) {
    let unique = arr
      .map((item) => item[filterType])
      .map((item, i, final) => final.indexOf(item) === i && i)
      .filter((item) => arr[item])
      .map((item) => arr[item]);
  
    return unique;
  }

// open cart menu
function openCartMenu(){
    if(cartsProductsDivDom.innerHTML != ""){
        if(cartProductsMenu.style.display =="block"){
            cartProductsMenu.style.display="none";
        } else {
            cartProductsMenu.style.display="block";
        }
    }
}

//Save Data to send to cartDetails page
function saveItemData(id) {
    console.log(id)
    localStorage.setItem("productId", id);
    window.location = "cartDetails.html";
}

// **************************************************************************************
let cartProductsMenuLove = document.querySelector(".love-products")
let cartsProductsDivDomLove = document.querySelector(".love-products div");
let loveCartIcon = document.querySelector(".love-cart");
let badgeDomLove= document.querySelector(".badge-love")

loveCartIcon.addEventListener("click",openCartMenuLove)


let addedItemLove=localStorage.getItem("productsInCartLove")
? JSON.parse(localStorage.getItem("productsInCartLove")) 
: [];

if(addedItemLove) {
    addedItemLove.map((item)=> {
        cartsProductsDivDomLove.innerHTML += `<p>${item.title} ${item.qty}</p>`
    });
    badgeDomLove.style.display="block";
    badgeDomLove.innerHTML += addedItemLove.length; 
}

// Add To Love 
let allItemsLove=[]
function addedToLove(id) {
    if (localStorage.getItem("username")) {
        let choosenItemLove = products.find((item) => item.id === id);
        let itemsLove =allItemsLove.find((i)=>i.id=== choosenItemLove.id)

        if(itemsLove) {
            choosenItemLove.qty+=1;
        } else {
            allItemsLove.push(choosenItemLove)
            console.log(allItemsLove)
        }

        cartsProductsDivDomLove.innerHTML=""
        allItemsLove.forEach(item=>{
            cartsProductsDivDomLove.innerHTML += `<p>${item.title} ${item.qty}</p>`;
        })

        addedItemLove = [...addedItemLove, choosenItemLove];

        let uniqueProductsLove = getUniqueArrLove(addedItemLove,"id")


        localStorage.setItem("productsInCartLove",JSON.stringify(uniqueProductsLove));
        let cartProductItemsLove = document.querySelectorAll(".love-products div p");
        badgeDomLove.style.display = "block";
        badgeDomLove.innerHTML = cartProductItemsLove.length;
    } else {
        window.location = "signin.html";
    }
}

function getUniqueArrLove(arr, filterType) {
    let unique = arr
      .map((item) => item[filterType])
      .map((item, i, final) => final.indexOf(item) === i && i)
      .filter((item) => arr[item])
      .map((item) => arr[item]);
  
    return unique;
  }


// open cart menu
function openCartMenuLove(){
    if(cartsProductsDivDomLove.innerHTML != ""){
        if(cartProductsMenuLove.style.display =="block"){
            cartProductsMenuLove.style.display="none";
        } else {
            cartProductsMenuLove.style.display="block";
        }
    }
}

//Save Data to send to cartDetails page
function saveItemDataLove(id) {
    console.log(id)
    localStorage.setItem("productIdLove", id);
    window.location = "LoveDetails.html";
}