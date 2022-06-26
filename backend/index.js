const bodyParser = require("body-parser");
const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const http = require("http");
const app = express();

const hostName = "localhost";
const port = 8099;

// Create server and set the port
const server = http.createServer(app);

// JSON Parse objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// START: MIDDLE WARE - HEADERS
// Sets Headers - this is triggered during change of route
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");

  console.log(`${chalk.blue(`[${req.method}]`)} ${req.url}`);

  next();
});
// END: MIDDLE WARE - HEADERS

// START: MIDDLE WARE - CORS
// Set cors
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// END: MIDDLE WARE - CORS

//routes
const api = require("./routes/index.route");

app.use("/", api);

server.listen(port, () => {
  console.log(`REST and Stomp broker running on http://${hostName}:${port}`);
});
