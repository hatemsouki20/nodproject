const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
const db = require ("./models");


require("./routers/produitrouters")(app);
require("./routers/clientRouts")(app)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to test node application." });
});

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

const port = 5500 ;
app.listen(port , ()=>{
    console.log(`le port que le serveur va ranne  on port est  ${port}!!!`)
})


