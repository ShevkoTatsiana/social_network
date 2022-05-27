import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  title: { 
    type: String, 
    requred: true
   },
  author_name: { 
  type: String, 
  requred: true
  },
  group_id: {
    type: String, 
    requred: true
  },
  gallery_image: {
    type: String,
    default: ""
  },
}, {
  timestamps: true,
});

export const GalleryModel = mongoose.model('Gallery', gallerySchema);
