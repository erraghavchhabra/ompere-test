const BASE_URL = "https://ompere.alohomorasol.com/api/calculator";

export const API = {
  // Static endpoints
  brands: `${BASE_URL}/brands`,
   machineTypes: `${BASE_URL}/machine-types`,
   capacities: `${BASE_URL}/capacities`,
    canopies: `${BASE_URL}/canopies`,
    calculate:    `${BASE_URL}/calculate`,
    valuationSubmit: `${BASE_URL}/valuation/submit`,
    blogs:    `${BASE_URL}/blogs`,
    singleBlog: (slug) => `${BASE_URL}/blog/${slug}`,
    priceMappingCanopies:   `${BASE_URL}/price-mappings/canopies`,
priceMappingCapacities: `${BASE_URL}/price-mappings/capacities`,
priceNewAll: `${BASE_URL}/price-new-all`,
contact: `${BASE_URL}/contact`,
sellRequest: `${BASE_URL}/sell-request`,
 settings: `${BASE_URL}/settings`,
 howItWork: `${BASE_URL}/how-it-work`,
 page: (slug) => `${BASE_URL}/pages/${slug}`,
 

};