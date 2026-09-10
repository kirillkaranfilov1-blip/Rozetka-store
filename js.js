const Product_box = document.querySelector(".Product_box");

const burger = document.querySelector("#burger");
const filters = document.querySelector("#filters");

const category = document.querySelector("#category");
const search = document.querySelector("#search");
const price = document.querySelector("#price");

const sortUp = document.querySelector("#sortUp");
const sortDown = document.querySelector("#sortDown");

let products = [];


/* БУРГЕР */

burger.addEventListener("click", () => {
    filters.classList.toggle("active");
});


/* ПОЛУЧАЕМ ТОВАРЫ */

function Getproduct() {

    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {

            products = data;

            createCategories();

            ShowProducts(products);

        });
}


/* КАТЕГОРИИ */

function createCategories() {

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


/* ПОКАЗ ТОВАРОВ */

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

            <button class="btnBy">
                Добавить в корзину
            </button>

        </div>

    `).join("");
}


/* ФИЛЬТРАЦИЯ */

function FilterProducts() {

    let result = [...products];


    /* КАТЕГОРИЯ */

    if (category.value !== "all") {

        result = result.filter(element =>
            element.category === category.value
        );

    }


    /* НАЗВАНИЕ */

    if (search.value !== "") {

        result = result.filter(element =>
            element.title
                .toLowerCase()
                .includes(search.value.toLowerCase())
        );

    }


    /* ЦЕНА */

    if (price.value !== "") {

        result = result.filter(element =>
            element.price <= Number(price.value)
        );

    }


    ShowProducts(result);
}


/* СОБЫТИЯ ФИЛЬТРОВ */

category.addEventListener("change", FilterProducts);

search.addEventListener("input", FilterProducts);

price.addEventListener("input", FilterProducts);


/* СОРТИРОВКА ПО ВОЗРАСТАНИЮ */

sortUp.addEventListener("click", () => {

    let result = [...products];

    result.sort((a, b) => a.price - b.price);

    ShowProducts(result);

});


/* СОРТИРОВКА ПО УБЫВАНИЮ */

sortDown.addEventListener("click", () => {

    let result = [...products];

    result.sort((a, b) => b.price - a.price);

    ShowProducts(result);

});


Getproduct();