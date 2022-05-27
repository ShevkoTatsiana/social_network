import {GalleryModel} from '../models/gallery.model.js';

class GalleryService {
    getAllByGroup(groupId) {
      return GalleryModel.find({group_id: groupId});
    }

    async createImage(imageData) {    
      const newImage = new GalleryModel(imageData);
      return newImage.save();
    }

    deleteImage(imageId) {
      return GalleryModel.findByIdAndDelete(imageId);
    }
  }
  
  export const galleryService = new GalleryService();
