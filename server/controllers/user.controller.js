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
      res.send(await userService.createUser(userData));
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
    res.send(await userService.editUser(req.params.id, userData));
  }
}

export const userController = new UsersController();