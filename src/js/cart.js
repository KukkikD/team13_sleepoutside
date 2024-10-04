import { getLocalStorage } from "./utils.mjs";

// Function to calculate the final price after applying discount
function calculateFinalPrice(item) {
  const discountAmount = (item.FinalPrice * item.Discount) / 100;
  return item.FinalPrice - discountAmount;
}

// Function to render the cart contents
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if there are any items in the cart and if it's an array
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  // Map through the cart items and generate HTML for each
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Function to generate HTML for each cart item
function cartItemTemplate(item) {
  // Calculate the final price after applying discount
  const finalPrice = calculateFinalPrice(item).toFixed(2);

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
    <p class="cart-card__price">Original Price: $${item.FinalPrice}</p>
    <p class="cart-card__discount">Discount: ${item.Discount}%</p>
    <p class="cart-card__final-price">Final Price: $${finalPrice}</p>
  </li>`;

  return newItem;
}

// Initialize the rendering of cart contents
renderCartContents();
