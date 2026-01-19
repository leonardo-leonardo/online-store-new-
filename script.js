const items = [
    {
        name: "Flappy Bird Game",
        price: 5,
        category: "games",
        img: "https://assets1.ignimgs.com/2014/01/31/flappy-bird-buttonjpg-e984c2.jpg"
    },
    {
        name: "Optimizing Laptop – Performance",
        price: 100,
        category: "optimizing",
        img: "https://mirillis.com/blog/wp-content/uploads/2017/10/Increase-PC-Speed-1250x917.jpg"
    }
];

let cart = [];
let total = 0;

function renderItems() {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = "";

    const search = document.getElementById("searchBar").value.toLowerCase();
    const category = document.getElementById("categorySelect").value;

    items.filter(item =>
        (category === "all" || item.category === category) &&
        item.name.toLowerCase().includes(search)
    ).forEach(item => {
        container.innerHTML += `
            <div class="item">
                <img src="${item.img}">
                <h3>${item.name}</h3>
                <p>NT$${item.price}</p>
                <input type="number" id="qty-${item.name}" value="1" min="1">
                <button onclick="addToCart('${item.name}', ${item.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(name, price) {
    const qty = parseInt(document.getElementById("qty-" + name).value);
    const found = cart.find(i => i.name === name);

    if (found) {
        found.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    total += price * qty;
    document.getElementById("dingSound").play();
    renderCart();
}

function renderCart() {
    const list = document.getElementById("cartList");
    list.innerHTML = "";

    cart.forEach((item, i) => {
        list.innerHTML += `
            <li>${item.name} × ${item.qty}
                <button onclick="removeItem(${i})">❌</button>
            </li>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("paymentRule").innerText =
        total >= 500 ? "Cash Before Delivery" : "Cash Only";
}

function removeItem(index) {
    total -= cart[index].price * cart[index].qty;
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Order sent!");
}

renderItems();
