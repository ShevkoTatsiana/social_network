const userService = require('../services/user.service')    

// exports.getUsers = async function (req, res, next) {
//     // Validate request parameters, queries using express-validator
    
//     var page = req.params.page ? req.params.page : 1;
//     var limit = req.params.limit ? req.params.limit : 10;
//     try {
//         const users = await UserService.getUsers({}, page, limit)
//         return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: e.message });
//     }
// }

// exports.getUsers = async function (req, res) {
//     // Validate request parameters, queries using express-validator
    
//     try {
//         res.send(UserService.getUsers())
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: e.message });
//     }
// }

class UsersController {

  getAll(req, res) {
    userService.getAll(req, res)
  }
  getById(req, res) {
    res.send(userService.getById(req.params.id))
  }
  createUser(req, res) {
      userService.createUser(req, res);
  }
  getUser(req, res) {
    userService.getUser(req, res);
  }
  deleteUser(req, res) {
    userService.deleteUser(req, res);
  }
  editUser(req, res) {
    userService.editUser(req, res);
  }
}

const userController = new UsersController()

module.exports = userController