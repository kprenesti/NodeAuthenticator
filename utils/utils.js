module.exports.add = (a, b)=>a+b;
module.exports.sayPlease = (response) => {
  return response.toLowerCase();
}

var cb = (user)=>{
  
}

var addName = (fullName, cb)=>{
  var user = {
    age: 33,
    birthday: 0
  };
  cb();
}

module.exports.nameObject = addName;
