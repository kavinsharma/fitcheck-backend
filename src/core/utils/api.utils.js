const axios = require("axios");
const config = require("../../config.js");
const baseSearch = async url => {
  const response = await axios.get(
    `${url}&api_key=${config.SERPAPI_SECRET_KEY}`,
  );
  return response.data;
};

const productSearch = async productId => {
  console.log("🚀 ~ productSearch ~ productId:", productId);
  const url = `${config.SERPAPI_BASE_URL}?engine=google_product&product_id=${productId}&api_key=${config.SERPAPI_SECRET_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

const dynamicFilters = async (data, filterType, filterValue) => {
  try {
    let filterdata;

    for (const filter of data?.filters) {
      if (filter?.type === filterType) {
        for (const op of filter.options) {
          if (op.text.toLowerCase() === filterValue.toLowerCase()) {
            filterdata = await baseSearch(op.serpapi_link);
            break;
          }
        }
      }
      if (filterdata) break;
    }

    return filterdata || data;
  } catch (error) {
    console.error("Error in dynamicFilters:", error);
    return data;
  }
};

const priceFilter = async (data, minPrice, maxPrice) => {
  try {
    const filteredResults = data.shopping_results.filter(item => {
      const price = parseFloat(item.price.replace("$", ""));

      return price > minPrice && price < maxPrice;
    });
    console.log("~ filteredResults ~ filteredResults:", filteredResults);

    return filteredResults.length < 3 ? data : filteredResults;
  } catch (error) {
    console.error("Error in dynamicFilters:", error);
    return data;
  }
};
module.exports = { baseSearch, dynamicFilters, productSearch, priceFilter };
