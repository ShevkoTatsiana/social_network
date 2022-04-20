const userService = require('../services/user.service');
const bcrypt = require('bcrypt');    

class UsersController {

  async getAll(req, res) {
    await userService.getAll().then(users => res.json(users))
       .catch(err => res.status(400).json('Error: ' + err));
  }
 
  async createUser(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
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

const userController = new UsersController()

module.exports = userController