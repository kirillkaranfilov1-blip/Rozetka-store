

const ApiBot="8864895178:AAHDc0rQNdGfndjpUEO50dppNU6Dn1oUoQs" 
const ChanelId="-1004437133794"

const form = document.querySelector("#orderForm");
const city = document.querySelector("#city");
const department = document.querySelector("#department");
const cartProducts = JSON.parse(
    localStorage.getItem("cartProducts")
) || [];

const departments = {
    "Одесса": [
        "Отделение №1",
        "Отделение №5",
        "Отделение №10",
        "Отделение №20"
    ],
    "Киев": [
        "Отделение №1",
        "Отделение №8",
        "Отделение №15",
        "Отделение №25"
    ],
    "Львов": [
        "Отделение №1",
        "Отделение №4",
        "Отделение №12",
        "Отделение №18"
    ],
    "Днепр": [
        "Отделение №2",
        "Отделение №7",
        "Отделение №14",
        "Отделение №22"
    ],
    "Харьков": [
        "Отделение №3",
        "Отделение №9",
        "Отделение №16",
        "Отделение №24"
    ]
};

city.addEventListener("change", () => {
    department.innerHTML = `
        <option value="">Выберите отделение</option>
    `;

    if (!departments[city.value]) return;

    departments[city.value].forEach(item => {
        department.innerHTML += `
            <option value="${item}">${item}</option>
        `;
    });
});

function validateForm() {
    const name = document.querySelector("#name").value.trim();
    const surname = document.querySelector("#surname").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const email = document.querySelector("#email").value.trim();
    const post = document.querySelector("#post").value;
    const selectedCity = document.querySelector("#city").value;
    const selectedDepartment = document.querySelector("#department").value;
    const payment = document.querySelector("#payment").value;

    const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z]{2,20}$/;
    const phoneRegex = /^\+?[0-9]{10,13}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Введите корректное имя");
        return false;
    }

    if (!nameRegex.test(surname)) {
        alert("Введите корректную фамилию");
        return false;
    }

    if (!phoneRegex.test(phone)) {
        alert("Введите корректный номер телефона");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Введите корректный Email");
        return false;
    }

    if (!post) {
        alert("Выберите службу доставки");
        return false;
    }

    if (!selectedCity) {
        alert("Выберите город");
        return false;
    }

    if (!selectedDepartment) {
        alert("Выберите отделение");
        return false;
    }

    if (!payment) {
        alert("Выберите способ оплаты");
        return false;
    }

    return true;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm()) {
    return;
}
    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const post = document.querySelector("#post").value;
    const selectedCity = document.querySelector("#city").value;
    const selectedDepartment = document.querySelector("#department").value;
    const payment = document.querySelector("#payment").value;
    const comment = document.querySelector("#comment").value;


    const productsMessage = cartProducts.map(product => {
    return `• ${product.title} × ${product.quantity}`;
}).join("\n");

const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
}, 0);

    const message = `
🛒 НОВЫЙ ЗАКАЗ

👤 Имя: ${name}
👤 Фамилия: ${surname}
📞 Телефон: ${phone}
📧 Email: ${email}

🚚 Доставка: ${post}
🏙 Город: ${selectedCity}
📦 Отделение: ${selectedDepartment}

💳 Оплата: ${payment}

💬 Комментарий:
${comment || "Нет"}
🛍 КУПЛЕННЫЕ ТОВАРЫ:

${productsMessage || "Корзина пуста"}


💰 ИТОГО: ${totalPrice.toFixed(2)}$
`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${ApiBot}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: ChanelId,
                    text: message
                })
            }
        );

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.description);
        }

        alert("Заказ успешно отправлен!");

        form.reset();

        department.innerHTML = `
            <option value="">Выберите отделение</option>
        `;

    } catch (error) {
        console.log(error);
        alert("Ошибка отправки заказа");
    }
});
