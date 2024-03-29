import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import * as url from 'url';
import {rootRouter} from './routing.js';
import { config } from './config.js';

const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "app", "build")));

mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB connected successfully");
});

app.use(express.static('public'));
app.use('/images', express.static('./images'));
app.use(express.urlencoded({ extended: true }));
app.use(rootRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "build", "index.html"));
});
if (process.env.NODE_ENV !== 'test') {
  app.listen((process.env.PORT || 8000), () => {
    console.log(`Server is running at port ${config.port}`);
  });
}

export { app };