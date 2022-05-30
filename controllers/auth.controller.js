import {authService} from '../services/auth.service.js';

class AuthController {
   async authenticate(req, res) {
    try {
      const result =  await authService.authenticate(req.body.email, req.body.password, req.body.social);
      res.send(result);
    } catch(err) {
      res.status(400).json({error: err.message})
    }
  }
}

export const authController = new AuthController();