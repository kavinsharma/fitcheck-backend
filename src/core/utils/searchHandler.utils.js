const axios = require("axios");
const config = require("../../config.js");
const serapiSearchHandler = async filters => {
  try {
    const { sex, minPrice, maxPrice, styleType, location, language, brands } =
      filters;
    let searchQuery = "";

    if (sex) searchQuery += `${sex}+`;

    if (brands) searchQuery += `cloths  ${brands}`;

    if (minPrice && maxPrice) {
      searchQuery += ` ${minPrice}-${maxPrice}`;
    }
    if (styleType) searchQuery += `${styleType}`;

    const params = {
      engine: "google_shopping",
      q: searchQuery,
      gl: location,
      // hl: language,
      api_key: config.SERPAPI_SECRET_KEY,
    };

    const response = await axios.get(`${config.SERPAPI_BASE_URL}`, { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching data from SerpApi:", error.message);
    throw new Error("Failed to retrieve products from SerpApi");
  }
};

module.exports = { serapiSearchHandler };
