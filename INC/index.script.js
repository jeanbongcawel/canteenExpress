let products = JSON.parse(localStorage.getItem("products")) || [];

let products = JSON.parse(localStorage.getItem("products"));

if (!products || products.length === 0) {
    products = [
        { name: "Rice (5kg)", quantity: 10, price: 280, level: 3 },
        { name: "Instant Noodles", quantity: 25, price: 12, level: 10 },
        { name: "Sardines", quantity: 15, price: 25, level: 5 },
        { name: "Coffee 3-in-1", quantity: 30, price: 8, level: 10 },
        { name: "Sugar (1kg)", quantity: 12, price: 60, level: 4 }
    ];
    localStorage.setItem("products", JSON.stringify(products));
}
function saveAndDisplay() {
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}
function addProduct() {
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const level = document.getElementById("level").value;

    if (!name || !quantity || !price || !level) {
        alert("Fill all fields!");
        return;
    }

    products.push({
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        level: parseInt(level)
    });

    saveAndDisplay();
}

function updateStock(index, change) {
    products[index].quantity += change;

    if (products[index].quantity < 0) {
        products[index].quantity = 0;
    }

    saveAndDisplay();
}

function displayProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    let total = 0;

    products.forEach((p, i) => {
        let status = p.quantity <= p.level ? "LOW STOCK" : "OK";
        let className = p.quantity <= p.level ? "low" : "ok";

        total += p.quantity * p.price;

        list.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.quantity}</td>
            <td>₱${p.price}</td>
            <td>${p.level}</td>
            <td class="${className}">${status}</td>
            <td>
                <button onclick="updateStock(${i}, 1)">+ Restock</button>
                <button onclick="updateStock(${i}, -1)">- Sell</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalValue").innerText = total.toFixed(2);
}

function saveAndDisplay() {
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

displayProducts();