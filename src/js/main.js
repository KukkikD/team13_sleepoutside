import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs"; // Import the ShoppingCart class

// Load the header and footer dynamically
loadHeaderFooter();

// Initialize the product list
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);
listing.init();

// Initialize the shopping cart
// const cartElement = document.querySelector(".product-list"); // Remove this line if not used
const shoppingCart = new ShoppingCart("cartItems", ".product-list"); // Directly pass the selector
shoppingCart.init();
