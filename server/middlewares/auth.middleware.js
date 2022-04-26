import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import {userService} from '../services/user.service.js';

export const auth = async (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    if (!token) {
      res.status(401).send()
      return
    }
    const payload = await jwt.verify(token, config.jwtSecret);
    console.log(payload);
    if (!payload) {
      res.status(401).send()
      return
    }
    const user = await userService.getById(payload.userId);
    console.log(user);
    if (user) {
      next()
    }
    return
  } catch {
    console.log('adasda');
    res.status(403).send()
    return
  }
  res.status(403).send()
}