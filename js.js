const Product_box = document.querySelector(".Product_box");

const burger = document.querySelector("#burger");
const filters = document.querySelector("#filters");

const category = document.querySelector("#category");
const search = document.querySelector("#search");
const price = document.querySelector("#price");

const sortUp = document.querySelector("#sortUp");
const sortDown = document.querySelector("#sortDown");

const cartBtn = document.querySelector("#cartBtn");
const cart = document.querySelector("#cart");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const closeCart = document.querySelector("#closeCart");

let products = [];
let cartProducts = [];
 cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

burger.addEventListener("click", () => {
    filters.classList.toggle("active");
});

function Getproduct() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            products = data;
            createCategories();
            ShowProducts(products);
        })
        .catch(error => {
            console.log("Ошибка:", error);
        });
}

function createCategories() {
    category.innerHTML = `
        <option value="all">Все категории</option>
    `;

    const categories = [...new Set(
        products.map(product => product.category)
    )];

    categories.forEach(item => {
        category.innerHTML += `
            <option value="${item}">
                ${item}
            </option>
        `;
    });
}

function ShowProducts(data) {
    Product_box.innerHTML = data.map(element => `
        <div class="Product_kard">

            <img src="${element.image}" alt="">

            <h3 class="Title">
                ${element.title}
            </h3>

            <p class="Product-category">
                ${element.category}
            </p>

            <p class="By-product">
                ${element.price}$
            </p>

            <button class="btnBy" onclick="AddToCart(${element.id})">
                Добавить в корзину
            </button>

        </div>
    `).join("");
}

function AddToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingProduct = cartProducts.find(
        item => item.id === id
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartProducts.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    ShowCart();
}

function PlusProduct(id) {
    const product = cartProducts.find(
        item => item.id === id
    );

    if (!product) return;

    product.quantity++;

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    ShowCart();
}

function MinusProduct(id) {
    const product = cartProducts.find(
        item => item.id === id
    );

    if (!product) return;

    product.quantity--;

    if (product.quantity <= 0) {
        cartProducts = cartProducts.filter(
            item => item.id !== id
        );
    }

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    ShowCart();
}

function RemoveFromCart(id) {
    cartProducts = cartProducts.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
    );

    ShowCart();
}

function ShowCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cartProducts.forEach(product => {

        total += product.price * product.quantity;

        cartItems.innerHTML += `

            <div class="cartItem">

                <img src="${product.image}" alt="">

                <div class="cartItemInfo">

                    <h3>
                        ${product.title}
                    </h3>

                    <p>
                        ${product.price}$ × ${product.quantity}
                    </p>

                </div>

                <div class="quantity">

                    <button onclick="MinusProduct(${product.id})">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="PlusProduct(${product.id})">
                        +
                    </button>

                </div>

            </div>

        `;
    });
    

    cartTotal.textContent = total.toFixed(2);
}
function PlusProduct(id) {

    const product = cartProducts.find(
        item => item.id === id
    );

    if (!product) return;

    product.quantity++;

    ShowCart();
}


function MinusProduct(id) {

    const product = cartProducts.find(
        item => item.id === id
    );

    if (!product) return;

    product.quantity--;

    if (product.quantity <= 0) {
        cartProducts = cartProducts.filter(
            item => item.id !== id
        );
    }

    ShowCart();
}
function RemoveFromCart(id) {
    cartProducts = cartProducts.filter(
        item => item.id !== id
    );

    ShowCart();
}

cartBtn.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

function FilterProducts() {
    let result = [...products];

    if (category.value !== "all") {
        result = result.filter(element =>
            element.category === category.value
        );
    }

    if (search.value !== "") {
        result = result.filter(element =>
            element.title
                .toLowerCase()
                .includes(search.value.toLowerCase())
        );
    }

    if (price.value !== "") {
        result = result.filter(element =>
            element.price <= Number(price.value)
        );
    }

    ShowProducts(result);
}

category.addEventListener("change", FilterProducts);

search.addEventListener("input", FilterProducts);

price.addEventListener("input", FilterProducts);

sortUp.addEventListener("click", () => {
    let result = [...products];

    result.sort((a, b) => a.price - b.price);

    ShowProducts(result);
});

sortDown.addEventListener("click", () => {
    let result = [...products];

    result.sort((a, b) => b.price - a.price);

    ShowProducts(result);
});
Getproduct();

ShowCart();