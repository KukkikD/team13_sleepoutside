import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if there are any items in the cart and if it's an array
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  // Create HTML for each cart item and display them
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // After rendering the cart items, calculate the total price
  calculateTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Function to calculate the total price of all items in the cart
function calculateTotal(cartItems) {
  let total = 0;

  // Loop through each cart item and add up the price
  cartItems.forEach((item) => {
    total += item.FinalPrice; // Assuming the FinalPrice field contains the price
  });

  // Display the total price in the HTML
  document.getElementById("cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
}

// Call renderCartContents when the page loads
renderCartContents();