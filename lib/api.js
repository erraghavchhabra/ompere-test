const BASE_URL = "https://ompere.alohomorasol.com/api/calculator";

export const API = {
  // Static endpoints
  brands: `${BASE_URL}/brands`,
   brandsLogo: `${BASE_URL}/brands-logo`,
   machineTypes: `${BASE_URL}/machine-types`,
   capacities: `${BASE_URL}/capacities`,
    canopies: `${BASE_URL}/canopies`,
    years: `${BASE_URL}/years`,
     hours: `${BASE_URL}/hours`,
     engineConditions: `${BASE_URL}/engine-conditions`,
    calculate:    `${BASE_URL}/calculate`,
    valuationSubmit: `${BASE_URL}/valuation/submit`,
    valuationUpdate: `${BASE_URL}/valuations`,   // used as  valuationUpdate/123
    blogs:    `${BASE_URL}/blogs`,
    testimoinals:    `${BASE_URL}/testimoinals`,
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