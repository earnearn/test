let express = require('express'),
    mongoose = require('mongoose'),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    dbConfig = require("./db")

const restroomRoute = require("./routes/restroom.route")


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("database successfully connected");
    },
    (error) => {
        console.log("Could not connect to database:" + error);
    }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", restroomRoute)
const http = require("http");

const requestListener = function (req, res) {
  res.end("Your IP Addresss is: " + req.socket.localAddress);
};


const port = process.env.PORT || 80;
const server = app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});