const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
var hash = bcrypt.hashSync(User.password, 10);
var db = require(./db/db);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.get('/login', (req, res)=>{

});

app.post('/', (req, res)=>{
  
})


app.listen(PORT, ()=> {
  console.log(`Serving on port ${PORT}`);
});

module.exports.app = app();
