import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = mime.extension(file.mimetype);
    console.log(ext, file.fieldname + '-' + uniqueSuffix + ext);
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({ storage, fileFilter });