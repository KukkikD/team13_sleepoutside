import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Ensure header and footer are loaded
loadHeaderFooter();

// Initialize the shopping cart and render contents
const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();