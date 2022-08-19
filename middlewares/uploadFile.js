import multer from 'multer';


import { getStorage, ref, deleteObject, uploadBytes, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import {initializeApp} from "firebase/app";
import { firebaseConfig } from '../config.js';
import { Storage } from '@google-cloud/storage';

const firebaseApp = initializeApp(firebaseConfig);
const fireBaseStorage = getStorage(firebaseApp);
// const fireBaseStorage = new Storage({
//   projectId: firebaseConfig.projectId,
//   keyFilename: firebaseConfig.keyFilename
// });
//const bucket = fireBaseStorage.bucket(firebaseConfig.storageBucket);

// Points to the root reference
const storageRef = ref(fireBaseStorage);

// Points to 'images'
const imagesRef1 = ref(storageRef, 'images');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './images')
//     cb(null, fireBaseStorage)
//   },
//   filename: function (req, file, cb) {
//     const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniquePreffix + '-' + file.originalname);
//   }
// });

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//export const upload = multer({ storage, fileFilter });

export const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  }, fileFilter });


export const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
  if (!file) {
    alert("Please upload an image first!");
  }
  console.log(file);
  let newFileName = `${file.originalname}_${Date.now()}`;
  const imagesRef = ref(storageRef, `/files/${newFileName}`);
  const metadata = {
    contentType: file.mimetype
  };

  const uploadTask = uploadBytesResumable(imagesRef, file.buffer, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
        console.log('change');
    },
    (err) => console.log(err),
    () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            resolve(url);
        });
    }
);
  // return new Promise((resolve, reject) => {
  //   if (!file) {
  //     reject('No image file');
  //   }
  //   let newFileName = `${file.originalname}_${Date.now()}`;

  //   let fileUpload = bucket.file(newFileName);

  //   const blobStream = fileUpload.createWriteStream({
  //     metadata: {
  //       contentType: file.mimetype
  //     }
  //   });

    // blobStream.on('error', (error) => {
    //   reject(error);
    // });

    // blobStream.on('finish', () => {
    //   // The public URL can be used to directly access the file via HTTP.
    //   const url = `https://firebasestorage.googleapis.com/v0/b/${
    //     bucket.name
    //   }/o/${encodeURI(fileUpload.name)}?alt=media`;
    //   resolve(url);
    // });

    // blobStream.end(file.buffer);
  });
};

export const deleteImageFromStorage = (str) => {
  const newVersion = str.includes('files%2');
  const startStr = newVersion ? str.indexOf('files%2F') : str.indexOf('o/');
  
  const endStr = str.indexOf('?alt');
  const startIndex = newVersion ? (startStr+8) : (startStr+2);
  const name = str.substring(startIndex, endStr);
  // bucket.getFiles(function(err, files) {
  //   if (!err) {
  //     const deletedFile = files.find(file => file.metadata.name === name);
  //     if(!!deletedFile) {
  //       deletedFile.delete();
  //     }
  //   }
  // });
  const desertRef = ref(storageRef, name);
  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log('File deleted successfully');
  }).catch((error) => {
    console.log(error);
  });
}