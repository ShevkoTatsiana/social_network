// Loads the configuration from config.env to process.env




// const username = "SWDatabase";
// const password = "198700mongoDB";
// const cluster = "sw.ednai";
// const dbname = "social_nw";

// mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// );
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const UserRouter = require('./routes/user.route');

require('dotenv').config();
// get MongoDB driver connection
//const dbo = require('./db/conn');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB connected successfully");
});

app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.use('/users', UserRouter);

//app.use(require('./routes/user.route'));

// Global error handling
// app.use(function (err, _req, res) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// perform a database connection when the server starts
// dbo.connectToServer(function (err) {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }

//   // start the Express server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//   });
// });


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});