import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
//import { initializeApp } from 'firebase/app';
//import { Storage } from '@google-cloud/storage';
import {rootRouter} from './routing.js';
import { config, firebaseConfig } from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB connected successfully");
});

//const fb = initializeApp(firebaseConfig);
// const storage = new Storage({
//   projectId: firebaseConfig.projectId,
//   keyFilename: firebaseConfig.keyFilename,
// });

// const bucket = storage.bucket(firebaseConfig.storageBucket);

app.use(express.static('public'));
app.use('/images', express.static('./images'));
app.use(express.urlencoded({ extended: true }));
app.use(rootRouter);


app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});