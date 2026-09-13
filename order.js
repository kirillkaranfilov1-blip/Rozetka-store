
const city = document.querySelector("#city");
const department = document.querySelector("#department");

const departments = {
    odesa: [
        "Отделение №1",
        "Отделение №5",
        "Отделение №10",
        "Отделение №20"
    ],
    kyiv: [
        "Отделение №1",
        "Отделение №8",
        "Отделение №15",
        "Отделение №25"
    ],
    lviv: [
        "Отделение №1",
        "Отделение №4",
        "Отделение №12",
        "Отделение №18"
    ],
    dnipro: [
        "Отделение №2",
        "Отделение №7",
        "Отделение №14",
        "Отделение №22"
    ],
    kharkiv: [
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