var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'admin',
  port: 5432,
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  pool.query('SELECT * FROM sanpham2', (err, respone) => {
    console.log(respone.row);
    pool.end()
  })
});
router.get('/addData', function(req, res, next) {
  res.render('add', { title: 'Express' });
});
router.get('/data', function(req, res) {
  pool.query('SELECT * FROM sanpham2', (err, respont) => {
    console.log(respont.rows);
    if(err){
      console.log(err)
    }
    else {
      res.send(respont.rows);
    }
   
  })
});
router.post('/addData', function(req, res, next) {
  var name = req.body.name; 
  var hinhanh = req.body.hinhanh;  
  var price = req.body.price
  pool.query("INSERT INTO sanpham2 (name,price,hinhanh) values ($1,$2,$3)",[name,price,hinhanh],(errro,respone)=>{
    if(errro){
      console.log(errro)
    }
    else{
      res.send("INSERT SUCEESS:" + name + price + hinhanh)
    }
  })
});
router.post('/updateData', function(req, res, next) {
  var name = req.body.name; 
  var hinhanh = req.body.hinhanh;  
  var price = req.body.price;
  var id = req.body.id;
  console.log(id);
  pool.query("UPDATE sanpham2 SET (name,price,hinhanh)=($1,$2,$3) WHERE id = $4",[name,price,hinhanh,id],(errro,respone)=>{
    if(errro){
      console.log(errro)
    }
    else{
      res.send("UPDATE SUCCESSS" + respone.row)
    }
  })
});
router.post('/removeData', function(req, res, next) {
  var id = req.body.id;
  pool.query("DELETE FROM sanpham2 WHERE id=$1",[id],(errro,respone)=>{
    if(errro){
      console.log(errro)
    }
    else{
      res.send("INSERT SUCEESS:" + id)
    }
  })
});

module.exports = router;
