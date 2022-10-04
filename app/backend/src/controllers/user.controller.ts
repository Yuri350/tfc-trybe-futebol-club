import { RequestHandler } from 'express';
import UsersService from '../services/user.service';

export default class UserController {
  public static login:RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const token = await UsersService.login({ email, password });
    res.status(201).json({ token });
  };
}
