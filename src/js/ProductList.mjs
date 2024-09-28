import { renderListWithTemplate } from "./utils.mjs";

// Function to create a product card template
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

// ProductListing class
export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    // Initialize the product listing by fetching data and rendering the list
    async init() {
      const list = await this.dataSource.getData();
      this.renderList(list); // Call the renderList method after data retrieval
    }
  
    // Render the list using the utility function for flexibility
    renderList(list) {
      renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    // Filter Products : Write a method  to filter the product list to the four tents we need
    filterProducts(products) {
    return products.filter(product =>
      ["tent1", "tent2", "tent3", "tent4"].includes(product.Id) // Update with actual IDs
    );
  }
  }