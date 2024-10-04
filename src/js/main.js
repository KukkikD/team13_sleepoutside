import { loadHeaderFooter } from "./utils.mjs";
// Import the ProductData module
// Adjust the path to ensure it's correct for your project structure
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// Create an instance of ProductData for the "tents" category
// This will load data from the '../json/tents.json' file
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();
