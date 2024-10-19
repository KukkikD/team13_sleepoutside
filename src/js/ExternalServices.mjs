
const baseURL = import.meta.env.VITE_SERVER_URL; // Add this line for the API base URL

//refactor function
async function convertToJson(res) {
  const jsonResponse = await res.json();
  
  if (res.ok) {
    return jsonResponse;
  } else {
    // Throw a custom error object with the name and message from the response
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    // Remove category and path as we don't need them for the API
   // this.category = category;
   // this.path = `../json/${this.category}.json`;
  }
  // Update getData method to accept category and use async/await
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`); // Fetch from API
    const data = await convertToJson(response);
    return data.Result; // Return the structured data from API
  }

  // Update findProductById to use the new getData method
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}