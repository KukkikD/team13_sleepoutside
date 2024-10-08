function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data); //can write another code is then(data) {retrun data;}
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id); // can write another code is product.find(item){return item.id===id;}
  }
}