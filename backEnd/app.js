require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

require('./routes/companies.js')({app:app});
require('./routes/user.js')({app:app});
require('./routes/migrate.js')({app:app});

app.get('/',(req,res) => {
  console.log("hello");
});

app.listen(port || 3000, ()=>{
  console.log(`Server Runs in http://localhost:${port}`);
});

module.exports = app;