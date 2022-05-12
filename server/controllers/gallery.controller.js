import {galleryService} from '../services/gallery.service.js';   

class GalleryController {

  async getAllByGroup(req, res) {
    const groupId = req.params.groupId;
    res.send(await galleryService.getAllByGroup(groupId));
  }
 
  async createImage(req, res) {
    const imageData = {
      title: req.body.title,
      gallery_image: req.file?.filename,
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
    res.send(await galleryService.deleteImage(req.params.id));
  }
}

export const galleryController = new GalleryController();