import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log('dest');
    cb(null, path.resolve(__dirname,'./public/uploads/images/'));
  },
  filename: function (req, file, cb) {
      console.log('upload');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null,file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    console.log(file.mimetype, 'type');
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({ storage, fileFilter });