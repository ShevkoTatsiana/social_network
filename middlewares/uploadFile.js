import multer from 'multer';
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import {initializeApp} from "firebase/app";
import { firebaseConfig } from '../config.js';

const firebaseApp = initializeApp(firebaseConfig);
const fireBaseStorage = getStorage(firebaseApp);

// Points to the root reference
const storageRef = ref(fireBaseStorage);

// Points to 'images'
const imagesRef1 = ref(storageRef, 'images');

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
    let newFileName = `${file.originalname}_${Date.now()}`;
    const imagesRef = ref(storageRef, `/files/${newFileName}`);
    const metadata = {
      contentType: file.mimetype,
      cacheControl: 'public,max-age=216000'
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
  });
};

export const deleteImageFromStorage = (str) => {
  const newVersion = str.includes('files%2');
  const startStr = newVersion ? str.indexOf('files%2F') : str.indexOf('o/');
  
  const endStr = str.indexOf('?alt');
  const startIndex = newVersion ? (startStr+8) : (startStr+2);
  const name = str.substring(startIndex, endStr);
  const desertRef = ref(storageRef, name);
  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log('File deleted successfully');
  }).catch((error) => {
    console.log(error);
  });
}