import {UserModel} from '../models/user.model.js';

class UsersService {
    constructor() {
      this.users = [];
    }
    getAll() {
      console.log(UserModel);
      return UserModel.find();
    }

    getUser(userId) {
      return UserModel.findById(userId);
    }

    createUser(userData) {
      console.log(userData);
        const newUser = new UserModel(userData);
        return newUser.save();
    }

    deleteUser(userId) {
      return UserModel.findByIdAndDelete(userId);
    }

    editUser(userId, userData) {
      return UserModel.findByIdAndUpdate(userId, userData);
    }
  }
  
  export const userService = new UsersService();
