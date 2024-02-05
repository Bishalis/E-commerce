// A mock function to mimic making an async request for data
export  function  createUsers(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
});
}




// A mock function to mimic making an async request for data
export  function  checkUsers(loginInfo) {
  return new Promise(async (resolve,reject) =>{
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch('http://localhost:8080/users?email='+email)
    const data = await response.json()
    console.log(data)
    if(data.length){
      if(password ===data[0].password){
        resolve({data:data[0]})
      }else{
        reject({message:' wrong crendentials'});
      }
    }else{
       reject({message:'user not found'})
    }
});
}