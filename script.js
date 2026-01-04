/*********************************
 ECO CARD 🌱 – SCRIPT.JS
 Authentication + Cart + Payment
**********************************/

/* ---------- DATABASE (localStorage) ---------- */
let users = JSON.parse(localStorage.getItem("ecoUsers")) || [];
let cart = JSON.parse(localStorage.getItem("ecoCart")) || [];

/* ---------- REGISTER ---------- */
function registerUser() {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    alert("Username already exists. Please login.");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("ecoUsers", JSON.stringify(users));

  alert("Registration successful! Please login 🌱");
  window.location.href = "login.html";
}

/* ---------- LOGIN ---------- */
function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    alert("Invalid credentials. Please register first.");
    return;
  }

  localStorage.setItem("ecoCurrentUser", JSON.stringify(user));

  alert(
    `Welcome ${user.username} 🌱\nReady to make a difference today?`
  );

  window.location.href = "index.html";
}

/* ---------- ADD TO CART ---------- */
function addToCart(name, price, image) {
  const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));

  if (!currentUser) {
    alert("Please login to add products to cart");
    window.location.href = "login.html";
    return;
  }

  cart.push({ name, price, image });
  localStorage.setItem("ecoCart", JSON.stringify(cart));

  alert(`${name} added to cart 🛒`);
}

/* ---------- LOAD CART PAGE ---------- */
function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total-display");
  const paymentSection = document.getElementById("payment-section");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🌱</p>";
    totalDisplay.innerText = "";
    paymentSection.style.display = "none";
    return;
  }

  let totalAmount = 0;
  let itemNames = [];

  cart.forEach(item => {
    totalAmount += item.price;
    itemNames.push(item.name);

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}">
      <p>${item.name} - ₹${item.price}</p>
    `;
    cartContainer.appendChild(div);
  });

  totalDisplay.innerText =
    itemNames.join(" + ") + " = ₹" + totalAmount;

  paymentSection.style.display = "block";
}

/* ---------- PLACE ORDER ---------- */
function placeOrder() {
  const paymentMethod = document.getElementById("payment-method").value;

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const productList = cart.map(item => item.name).join(", ");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  alert(
    `ORDER CONFIRMED 🎉\n\nProducts:\n${productList}\n\nTotal: ₹${total}\nPayment: ${paymentMethod}\n\nThank you for choosing ECO CARD 🌍`
  );

  cart = [];
  localStorage.removeItem("ecoCart");

  window.location.href = "index.html";
}

/* ---------- AUTO LOAD CART ---------- */
window.onload = loadCart;
