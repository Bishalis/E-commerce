export  function  addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'Content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
});
}

export  function  updateCard(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'Content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
});
}


export  function  deleteCard(itemId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      body:JSON.stringify(itemId),
      headers:{'Content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
});
}
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user="+userId);
    const data = await response.json();
    console.log(data)
    resolve({ data});
  });
}