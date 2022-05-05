import {userGroupService} from '../services/userGroup.service.js';   

class UserGroupController {

  
 
  async createUserGroup(req, res) {
    const data = {
      userId: req.params.id,
      groupId: req.body.groupId
    };
    console.log(data, 'cont');
    try {
      const result = await userGroupService.createUserGroup(data);
      console.log(result, 'cont');
      res.send(result);
    } catch(e) {
      console.log(e, 'cont');
      res.status(400).json({ error: 'a Group is already registered' });
    }       
  }
  async getAllUserGroup(req, res) {
   res.send(await userGroupService.getAllUserGroup(req.params.id));
  }
  async getAllUsersInGroups(req, res) {
    res.send(await userGroupService.getAllUsersInGroup(req.params.id));
  }
  // async deleteGroup(req, res) {
  //   res.send(await groupService.deleteGroup(req.params.id));
  // }
  // async editGroup(req, res) {
  //   const groupData = {
  //     name: req.body.name,
  //     users: req.body.users,
  //     description: req.body.description,
  //     profile_photo: req.file?.filename
  //   };
  //   try {
  //     const result = await groupService.editGroup(req.params.id, groupData);
  //     res.send(result);
  //   } catch(e) {
  //     res.status(400).json({ error: 'a group name is already registered' });
  //   }   
  // }
}

export const userGroupController = new UserGroupController();