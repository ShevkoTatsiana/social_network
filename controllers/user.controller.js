import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import {userService} from '../services/user.service.js';   
import {uploadImageToStorage, deleteImageFromStorage} from '../middlewares/uploadFile.js';
import {sendConfirmationEmail} from '../nodemailer.config.js';

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
    const userImage = req.body.social ? req.body.profile_photo : fileUrl;
    const code = jwt.sign({email: req.body.email}, config.jwtSecret)
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo: userImage,
      social: req.body.social,
      confirmationCode: code
    };
    try {
      const result = await userService.createUser(userData);
      console.log(result, 'user cont');
      sendConfirmationEmail(userData.name, userData.email, userData.confirmationCode);
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
      profile_photo: fileUrl,
      social: req.body.social
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

  async verifyUser(req, res) {
    try {
      const result = await userService.verifyUser(req.params.confirmationCode);
      res.send(result);
    } catch(e) {
      console.log("error", e);
    }
  }
}

export const userController = new UsersController();