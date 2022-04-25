import {authService} from '../services/auth.service.js';

class AuthController {
  async authenticate(req, res) {
    console.log(req.body);
    res.send(await authService.authenticate(req.body.email, req.body.password))
  }
}

export const authController = new AuthController();