import multer from 'multer';

import { getStorage, ref, deleteObject } from 'firebase/storage';
import { firebaseConfig } from '../config.js';
import { Storage } from '@google-cloud/storage';

// const firebaseApp = initializeApp(firebaseConfig);
// const fireBaseStorage = getStorage(firebaseApp);
const fireBaseStorage = new Storage({
  projectId: firebaseConfig.projectId,
  keyFilename: firebaseConfig.keyFilename
});
const bucket = fireBaseStorage.bucket(firebaseConfig.storageBucket);

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
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        cacheControl: 'public,max-age=216000'
      }
    });

    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(fileUpload.name)}?alt=media`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

export const deleteImageFromStorage = (str) => {
  const startStr = str.indexOf('o/');
  const endStr = str.indexOf('?alt');
  const name = str.substring((startStr+2), endStr);
  bucket.getFiles(function(err, files) {
    if (!err) {
      const deletedFile = files.find(file => file.metadata.name === name);
      if(!!deletedFile) {
        deletedFile.delete();
      }
    }
  });
}
