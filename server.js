const exp = require("express");
const app = exp();
const bodyparser = require("body-parser");
const path = require("path")
const cors = require("cors");
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(bodyparser.json());
app.use(cors());


app.get("/", function (req, res) {
    res.json({message: "API Listening"});
});

app.post("/api/movies", (req,res) => {
    myData.addNewMovie(req.body)
    .then(() => {
            res.status(201).json(`new film successfully added`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/movies", (req,res) => {
    myData.getAllMovies(req.query.page, req.query.perPage)
        .then((film) => {
            res.status(200).json(film);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/movies/:id", (req,res) => {
    myData.getMovieById(req.params.id)
        .then((film) => {
            res.status(200).json(film);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/movies/:id", (req,res) => {
    myData.updateMovieById(req.body, req.params.id)
        .then(() => {
            res.status(200).json(`film ${req.body._id} successfully updated`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/movies/:id", (req,res) => {
    myData.deleteMovieById(req.params.id)
        .then(() => {
            res.status(200).json(`film ${req.params.id} successfully deleted`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});



var port = process.env.PORT || 3000;

app.listen(port);