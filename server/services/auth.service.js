import {UserModel} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

class AuthService {
  async authenticate(email, password) {
    console.log(email, password);
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user?.authenticate(password)) {
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        token: await jwt.sign({ userId: user._id }, config.jwtSecret)
      }
    } else {
      throw new Error('Invalid credentials')
    }
    // await UserModel.findOne({email}, async (user, err) => {
    //   if (user?.authenticate(password)) {
    //       return {
    //         user: {
    //           _id: user._id,
    //           name: user.name,
    //           email: user.email
    //         },
    //         token: await jwt.sign({ userId: user._id }, config.jwtSecret)
    //       }
    //     } else {
    //       throw new Error('Invalid credentials')
    //     }
    // })
  }
}

export const authService = new AuthService();