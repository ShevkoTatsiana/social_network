import {userService} from '../services/user.service.js';   
import {uploadImageToStorage, deleteImageFromStorage} from '../middlewares/uploadFile.js';

class UsersController {

  async getAll(req, res) {
    res.send(await userService.getAll());
  }
 
  async createUser(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo: fileUrl
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
    try {
      const result = await userService.deleteUser(req.params.id);
      deleteImageFromStorage(result.profile_photo);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'can\'t delete a user' });
    }
  }
  async editUser(req, res) {
    let file = req.file;
    let fileUrl = '';
    if (file) {
      fileUrl = await uploadImageToStorage(file).then((url) => {
        return url;
      }).catch((e)=> console.log(e));
    };
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo: fileUrl
    };
    try {
      const result = await userService.editUser(req.params.id, userData);
      res.send(result);
    } catch(e) {
      res.status(400).json({ error: 'an email adress is already registered' });
    }   
  }
  async getAllUserInGroup(req, res) {
    const userGroupIds = req.params.userIds;
    res.send(await userService.getAllUserInGroup(userGroupIds));
  }
}

export const userController = new UsersController();