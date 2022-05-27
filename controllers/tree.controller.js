import {treeService} from '../services/tree.service.js';   
import {uploadImageToStorage, deleteImageFromStorage} from '../middlewares/uploadFile.js';

class TreeController {

  async getTree(req, res) {
    const groupId = req.params.groupId;
    res.send(await treeService.getTree(groupId));
  }
 
  async createTree(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const treeData = {
      children: req.body.children,
      dates: req.body.dates,
      photo: fileUrl,
      info: req.body.info,
      level: req.body.level,
      name: req.body.name,
      group_id: req.body.group_id,
      parents: req.body.parents,
      partner: req.body.partner,
      siblings: req.body.siblings
    };

    try {
      const result = await treeService.createTree(treeData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t publish a tree' });
    }       
  }

  async editTree(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const treeData = {
      children: req.body.children,
      dates: req.body.dates,
      photo: fileUrl,
      info: req.body.info,
      level: req.body.level,
      name: req.body.name,
      group_id: req.body.group_id,
      parents: req.body.parents,
      partner: req.body.partner,
      siblings: req.body.siblings
    };
    try {
      const result = await treeService.editTree(req.params.id, treeData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t edit a tree' });
    }       
  }
  
  async deleteTree(req, res) {
    try {
      const result = await treeService.deleteTree(req.params.id);
      deleteImageFromStorage(result.photo);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t delete a member' });
    }
  }
}

export const treeController = new TreeController();