import { setLocalStorage, getLocalStorage } from "./utils.mjs";

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
      // Get product details
      this.product = await this.dataSource.findProductById(this.productId);
    
       
      // Render product details
      this.renderProductDetails("main");
    
      // Add an event listener to the "Add to Cart" button
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }

    
    addToCart() {
      // Get the current cart from LocalStorage
      let cart = getLocalStorage("so-cart") || [];
    
      // Add the new product to the cart
      cart.push(this.product);
    
      // Save the updated cart back to LocalStorage
      setLocalStorage("so-cart", cart);
    }

    renderProductDetails(selector) {
      const element = document.querySelector(selector);
      element.insertAdjacentHTML(
        "afterBegin",
        productDetailsTemplate(this.product)
      );
    }
}

  