const express = require("express");
const connectToMongo = require("./db");
const app = express();
const port = 5000;
 app.use(express.json())
 var cors = require('cors')
 app.use(cors());

connectToMongo();
app.use('/auth',require('./routes/auth'));
app.use('/questions',require('./routes/questions'));


app.listen(port, () => {
  console.log(`DSA-eTracker listening on port ${port}`);
});
 