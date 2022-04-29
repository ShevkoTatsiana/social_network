import {authService} from '../services/auth.service.js';

class AuthController {
   async authenticate(req, res) {
    try {
      const result =  await authService.authenticate(req.body.email, req.body.password);
      res.send(result);
    } catch(err) {
      res.status(400).json(err)
    }
  }
}

export const authController = new AuthController();