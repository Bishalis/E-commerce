export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function updatedOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/' + order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = ``;
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?${queryString}`)
    const data = await response.json()
    const totalOrders = response.headers.get("X-Total-Count");
    console.log(totalOrders)
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

