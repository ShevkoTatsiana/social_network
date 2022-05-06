import {groupService} from '../services/group.service.js';   

class GroupController {

  async getAllGroups(req, res) {
    const userGroupIds = req.params.groupIds;
    res.send(await groupService.getAll(userGroupIds));
  }
 
  async createGroup(req, res) {
    const groupData = {
      name: req.body.name,
      description: req.body.description,
      profile_photo: req.file?.filename
    };
    console.log(groupData, 'cont');
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
    res.send(await groupService.deleteGroup(req.params.id));
  }
  async editGroup(req, res) {
    const groupData = {
      name: req.body.name,
      description: req.body.description,
      profile_photo: req.file?.filename
    };
    console.log(req.params, 'param', groupData);
    try {
      const result = await groupService.editGroup(req.params.groupId, groupData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'a group can\'/t be updated' });
    }   
  }
}

export const groupController = new GroupController();