import { getLocalStorage } from "./utils.mjs";

// Function to render the cart items
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // After rendering the cart items, update the total price
  updateTotalPrice(cartItems);
  document.querySelector(".cart-footer").classList.remove("hide");
}

// Function to update the total price
function updateTotalPrice(cartItems) {
  const totalPriceElement = document.getElementById("cart-total");

  // Correctly calculate total using item quantity
  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.FinalPrice) || 0; // Convert to number, otherwise 0
    const quantity = parseInt(item.quantity) || 1; // Convert to integer, otherwise 1
    return acc + (price * quantity);
  }, 0);

  totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove or reduce item from cart
window.removeFromCart = function (Id) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Find the item in the cart
  const itemIndex = cartItems.findIndex(item => item.Id === Id);
  if (itemIndex !== -1) {
    // Reduce quantity by 1
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
    } else {
      // If the quantity is 1, remove the item
      cartItems.splice(itemIndex, 1);
    }

    // Update the cart in local storage
    localStorage.setItem("so-cart", JSON.stringify(cartItems));

    // Re-render the cart contents
    renderCartContents();
  }
};

// Template for individual cart item
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button onclick="removeFromCart('${item.Id}')">Remove</button> <!-- Use Id with uppercase "I" -->
  </li>`;

  return newItem;
}

// Call this function on page load to display the cart
document.addEventListener("DOMContentLoaded", renderCartContents);