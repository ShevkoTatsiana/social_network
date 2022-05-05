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

    async createUser(userData) {
      const isUserDataUnique = await UserModel.findOne({email: userData.email});
      if (!isUserDataUnique) {
        const newUser = new UserModel(userData);
        return newUser.save();
      } else {
        throw new Error('User already exists!');
      }
    }

    deleteUser(userId) {
      return UserModel.findByIdAndDelete(userId);
    }

    async editUser(userId, userData) {
      const isUserDataUnique = await UserModel.findOne({email: userData.email});
      if (!isUserDataUnique) {
        return UserModel.findByIdAndUpdate(userId, userData);
      } else {
        throw new Error('User already exists!');
      }      
    }

    getAllUserInGroup(userIds) {
      const stringIds = userIds.split(',');
      return UserModel.find({_id: {$in: stringIds}});         
    }
  }
  
  export const userService = new UsersService();
