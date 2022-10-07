import { RequestHandler } from 'express';
import UsersService from '../services/user.service';

type StatusError = {
  message: string,
  status: number,
};

export default class UserController {
  public static login:RequestHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await UsersService.login({ email, password });
      return res.status(200).json({ token });
    } catch (er) {
      const error = er as StatusError;
      console.log(error);
      return res.status(error.status).json({ message: error.message });
    }
  };
}
