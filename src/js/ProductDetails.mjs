import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }
  
    async init() {
      try {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
      } catch (error) {
        console.error("Error fetching product details:", error);
        // Optionally, display an error message to the user
      }
    }
  
    renderProductDetails() {
        // Get the container element
        const productContainer = document.getElementById("productDetailsContainer");
      
        // Generate HTML using the productDetailsTemplate
        productContainer.innerHTML = productDetailsTemplate(this.product);
    }
  
    addToCart() {
      const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
      const existingProduct = cart.find(item => item.Id === this.product.Id);
      
      if (existingProduct) {
        alert("This product is already in your cart.");
      } else {
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert("Product added to cart!");
      }
    }
    
}
  