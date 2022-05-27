import {userGroupService} from '../services/userGroup.service.js';   

class UserGroupController {
  async createUserGroup(req, res) {
    const data = {
      userId: req.params.id,
      groupId: req.body.groupId
    };
    try {
      const result = await userGroupService.createUserGroup(data);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'a Group is already registered' });
    }       
  }
  async getAllUserGroup(req, res) {
   res.send(await userGroupService.getAllUserGroup(req.params.id));
  }
  async getAllUsersInGroups(req, res) {
    res.send(await userGroupService.getAllUsersInGroup(req.params.id));
  }
  async deleteUserGroup(req, res) {
    res.send(await userGroupService.deleteUserGroup(req.params.id, req.params.groupId));
  }
}

export const userGroupController = new UserGroupController();