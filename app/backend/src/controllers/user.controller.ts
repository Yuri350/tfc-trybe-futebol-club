// import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import UsersService from '../services/user.service';

type StatusError = {
  message: string,
  status: number,
};

export default class UserController {
  constructor(private usersService: UsersService) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.usersService.login(email, password);
      return res.status(200).json({ token });
    } catch (er) {
      const error = er as StatusError;
      console.log(error);
      return res.status(error.status).json({ message: error.message });
    }
  };

  public getAll = async (req: Request, res: Response) => {
    const result = await this.usersService.getAll();
    return res.status(200).json(result);
  };
}
