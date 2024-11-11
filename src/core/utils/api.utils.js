const axios = require("axios");
const config = require("../../config.js");
const baseSearch = async url => {
  const response = await axios.get(
    `${url}&api_key=${config.SERPAPI_SECRET_KEY}`,
  );
  return response.data;
};

const dynamicFilters = async (data, filterType, filterValue) => {
  try {
    let filterdata;

    for (const filter of data.filters) {
      if (filter.type === filterType) {
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

module.exports = { baseSearch, dynamicFilters };
