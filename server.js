const exp = require("express");
const app = exp();
const bodyparser = require("body-parser");
const cors = require("cors");

app.use(bodyparser.json());
app.use(cors());

// http://localhost/api/users
app.get("/", function (req, res) {
    res.json(users);
});



var port = process.env.PORT || 8080;

app.listen(port);