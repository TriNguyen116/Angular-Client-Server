const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
  origin: 'http://localhost:4200',
  //domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
  //giả sử node server là http://localhost:8000
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
const app = express();
// app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json())
app.listen(8000, () => {
  console.log('Server started!');
  });
app.route('/api/items').get((req, res) => {
  console.log('items');
  res.send([{ name: 'lilly', id:'id1' }, { name: 'Oscar', id:'id2' }]
  );
});

//insert
app.route('/api/insert').post((req, res) => {
		 
  console.log('insert item');
  console.log('item info:'+req.body);
  res.send(201, req.body);
  // res.status(201).send(req.body);
  });