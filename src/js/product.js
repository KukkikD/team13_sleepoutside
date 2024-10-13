import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Use getParam to Retrieve the Product ID
const productId = getParam("product");

// Created instance of the ProductData class
const dataSource = new ProductData("tents");

// Created instance of the ProductDetails class
const product = new ProductDetails(productId, dataSource);
product.init();