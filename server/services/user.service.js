 const User = require('../models/user.model')

class UsersService {
    constructor() {
      this.users = [];
    }
    getAll() {
      return User.find();
    }

    getUser(userId) {
      return User.findById(userId);
    }

    createUser(userData) {
        const newUser = new User(userData);
        return newUser.save();
    }

    deleteUser(userId) {
      return User.findByIdAndDelete(userId);
    }

    editUser(userId, userData) {
      return User.findByIdAndUpdate(userId, userData);
    }
  }
  
  const usersService = new UsersService()
  
  module.exports = usersService