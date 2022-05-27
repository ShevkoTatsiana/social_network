import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import {userService} from '../services/user.service.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    if (!token) {
      res.status(401).send()
      return
    }
    const payload = await jwt.verify(token, config.jwtSecret);
    if (!payload) {
      res.status(401).send()
      return
    }
   
    if (payload.userId) {
      req.params.id = payload.userId;
      next()
    }
    return
  } catch {
    res.status(403).send()
    return
  }
  res.status(403).send()
}