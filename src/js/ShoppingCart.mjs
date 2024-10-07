import { getLocalStorage } from "./utils.mjs";

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

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  }
}

/*
import { getLocalStorage } from "./utils.mjs";


function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

export default class ShoppingCart {
    constructor() {
      this.cart = [];
    }

    async init() {
      // Fetch cart items from the data source
      const cartItems = await this.getData();
      if (cartItems) {
        this.renderCart(cartItems);
      }
    }

    async getData() {
      try {
        const response = await fetch("./json/tents.json");
        if (response.ok) {
          const data = await response.json(); // successfully fetched data
          return data;
        } else {

          return null; // return null if fetch fails
        }
      } catch (error) {
        return null; // return null if there's a network error
      }
    }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    if (cartItems.length === 0) {
      document.querySelector(this.parentSelector).innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
    document.querySelector(this.parentSelector).innerHTML = htmlItems;
  }

  updateCartTotal() {
    const cartItems = getLocalStorage(this.key) || [];
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector("#cart-total").textContent = `Total: $${total}`;

    // Show the cart-footer if there are items in the cart
    const cartFooter = document.querySelector(".cart-footer");
    if (cartItems.length > 0) {
      cartFooter.classList.remove("hide");
    } else {
      cartFooter.classList.add("hide");
    }
  }
}
  */
