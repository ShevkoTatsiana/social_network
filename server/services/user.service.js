 const User = require('../models/user.model')

// exports.getAll =  User.find()
// .then(users => res.json(users))
// .catch(err => res.status(400).json('Error: ' + err));

//exports.getUsers = async function () {


    // try {
    //     var users = await User.find()
    //     return users;
    // } catch (e) {
    //     // Log Errors
    //     throw Error('Error while Paginating Users')
    // }
//}



class UsersService {
    constructor() {
      this.users = [];
    }
    async getAll(req, res) {
        const result = await User.find().then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
      return result;
    }

    async getUser(req, res) {
      const result = await User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
        return result;
    }

    async createUser(req, res) {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          };
          const newUser = new User(userData);
          const result =  await newUser.save()
          .then(() => res.json('User added!'))
          .catch(err => res.status(400).json('Error: ' + err));
          return result;
    }

    async deleteUser(req, res) {
      const result  = User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
    }

    async editUser(req, res) {
      const result =  User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
      return result;  
    }
  
    getById(id) {
      return this.users.find(user => user.id.toString() === id.toString())
    }
  }
  
  const usersService = new UsersService()
  
  module.exports = usersService