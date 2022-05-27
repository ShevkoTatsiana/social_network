import {galleryService} from '../services/gallery.service.js';   
import {uploadImageToStorage, deleteImageFromStorage} from '../middlewares/uploadFile.js';

class GalleryController {

  async getAllByGroup(req, res) {
    const groupId = req.params.groupId;
    res.send(await galleryService.getAllByGroup(groupId));
  }
 
  async createImage(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };

    const imageData = {
      title: req.body.title,
      gallery_image: fileUrl,
      author_name: req.body.author_name,
      group_id: req.body.group_id
    };
    try {
      const result = await galleryService.createImage(imageData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t publish an image' });
    }       
  }
  
  async deleteImage(req, res) {
    try {
      const result = await galleryService.deleteImage(req.params.id);
      deleteImageFromStorage(result.gallery_image);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t delete an image' });
    }
  }
}

export const galleryController = new GalleryController();