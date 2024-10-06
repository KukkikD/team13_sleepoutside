import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Get the data from the data source
    const list = await this.dataSource.getData();
    
    // Get unique products based on Id
    const uniqueProducts = this.getUniqueProducts(list);

    // Render the list of unique products
    renderListWithTemplate(productCardTemplate, this.listElement, uniqueProducts);
  }

  getUniqueProducts(products) {
    // Filter out duplicate products based on Id
    return products.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.Id === product.Id)
    );
  }
}
