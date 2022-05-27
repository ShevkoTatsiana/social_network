import {groupService} from '../services/group.service.js';   
import {uploadImageToStorage, deleteImageFromStorage} from '../middlewares/uploadFile.js';

class GroupController {

  async getAllGroups(req, res) {
    const userGroupIds = req.params.groupIds;
    res.send(await groupService.getAll(userGroupIds));
  }
 
  async createGroup(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const groupData = {
      name: req.body.name,
      description: req.body.description,
      profile_photo: fileUrl
    };
  
    try {
      const result = await groupService.createGroup(groupData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'a Group is already registered' });
    }       
  }
  async getGroup(req, res) {
   res.send(await groupService.getGroup(req.params.name));
  }
  async deleteGroup(req, res) {
    try {
      const result = await groupService.deleteGroup(req.params.id);
      deleteImageFromStorage(result.profile_photo);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t delete a group' });
    }
  }
  async editGroup(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const groupData = {
      name: req.body.name,
      description: req.body.description,
      profile_photo: fileUrl
    };
    try {
      const result = await groupService.editGroup(req.params.groupId, groupData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'a group can\'/t be updated' });
    }   
  }
}

export const groupController = new GroupController();