import {userService} from '../services/user.service.js';   

class UsersController {

  async getAll(req, res) {
    res.send(await userService.getAll());
  }
 
  async createUser(req, res) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo: req.file?.filename
    };
    try {
      const result = await userService.createUser(userData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'an User is already registered' });
    }       
  }
  async getUser(req, res) {
   res.send(await userService.getUser(req.params.id));
  }
  async deleteUser(req, res) {
    res.send(await userService.deleteUser(req.params.id));
  }
  async editUser(req, res) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo: req.file?.filename
    };
    try {
      const result = await userService.editUser(req.params.id, userData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'an email adress is already registered' });
    }   
  }
  async addGroupToUser(req, res) {
    const groupId = req.body.groupId;
    try {
      const result = await userService.addGroupToUser(req.params.id, groupId);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t add group to user' });
    } 
  }
}

export const userController = new UsersController();