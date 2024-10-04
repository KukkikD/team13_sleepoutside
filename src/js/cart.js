import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

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

const products = [
  {
    name: 'Marmot Ajax Tent',
    price: 199.99,
    discount: 10, // 10% discount
    quantity: 1
  },
  {
    name: 'The North Face Talus Tent',
    price: 299.99,
    discount: 5, // 5% discount
    quantity: 1
  },
  {
    name: 'Big Agnes Copper Spur Tent',
    price: 399.99,
    discount: 15, // 15% discount
    quantity: 1
  }
];

function calculateFinalPrice(product) {
  const discountAmount = (product.price * product.discount) / 100;
  return product.price - discountAmount;
}

function updateCartDisplay() {
  const productListElement = document.querySelector('.product-list');
  productListElement.innerHTML = ''; // Clear the list

  products.forEach((product) => {
    const finalPrice = calculateFinalPrice(product).toFixed(2);

    const productHTML = `
      <li class="cart-card divider">
        <h2 class="card__name">${product.name}</h2>
        <p class="cart-card__price">Price: $${product.price}</p>
        <p class="cart-card__discount">Discount: ${product.discount}%</p>
        <p class="cart-card__final-price">Final Price: $${finalPrice}</p>
      </li>
    `;
    productListElement.innerHTML += productHTML;
  });
}

// Run the function to update the cart display when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);


renderCartContents();
