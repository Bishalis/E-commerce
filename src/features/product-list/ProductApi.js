// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductsFilter(filter, sort, pagination) {
  //filter   = {'catrgory': ['smartphone', laptops]}
  //sort = {_sort:"price " , _order : "desc"}
  //pagination = {_page:1 , _limit=10} _page=1&_limit=10
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastcategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastcategoryValue}&`;
    }
  }

  for (let key in sort) {
    const categoryValues = sort[key];
    queryString += `${key}=${categoryValues}&`;
  }

  for (let key in pagination) {
    const categoryValues = pagination[key];
    queryString += `${key}=${categoryValues}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?"+queryString
    );
    const data = await response.json();
    const totalItems = 100;  // Replace with the actual total count
    const headers = new Headers(response.headers);
    headers.set('X-Total-Count', totalItems);
    resolve({ data: { products: data, totalItems: parseInt(totalItems) }});
  });
}
