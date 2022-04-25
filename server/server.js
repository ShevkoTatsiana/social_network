import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {rootRouter} from './routing.js';
import { config } from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB connected successfully");
});

app.use(rootRouter);

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});