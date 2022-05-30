import {UserModel} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

class AuthService {
  async authenticate(email, password, social) {
    const user = await UserModel.findOne({ email });
    if (user.status === "Pending") {
      throw new Error('Pending Account. Please Verify Your Email!')
    }
    if ((social && user.social) || user?.authenticate(password)) {
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
  }
}

export const authService = new AuthService();