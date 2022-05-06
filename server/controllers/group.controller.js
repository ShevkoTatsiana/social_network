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
      users: req.body.users,
      description: req.body.description,
      profile_photo: req.file?.filename
    };
    try {
      const result = await groupService.editGroup(req.params.id, groupData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'a group name is already registered' });
    }   
  }
}

export const groupController = new GroupController();