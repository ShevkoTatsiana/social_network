import {userService} from '../services/user.service.js';
//import bcrypt from 'bcrypt';    

class UsersController {

  async getAll(req, res) {
    await userService.getAll().then(users => res.json(users))
       .catch(err => res.status(400).json('Error: ' + err));
  }
 
  async createUser(req, res) {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      await userService.createUser(userData).then((user) => res.json(user), (reason) => res.json(reason))
         .catch(err => res.status(400).json('Error: ' + err));
  }
  async getUser(req, res) {
   await userService.getUser(req.params.id).then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));;
  }
  async deleteUser(req, res) {
    await userService.deleteUser(req.params.id).then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));;;
  }
  async editUser(req, res) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    await userService.editUser(req.params.id, userData).then(() => res.json('User updated!'))
    .catch(err => res.status(400).json('Error: ' + err));;
  }
}

export const userController = new UsersController();