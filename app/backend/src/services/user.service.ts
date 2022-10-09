import IUser from '../interface/IUser';
import UserModel from '../database/models/user.model';
import Bcrypt from '../middleware/Bcrypt';
import { createToken } from '../middleware/token';

interface StatusError extends Error {
  message: string,
  status: number,
}

const catchError = (status: number, message: string) => {
  const error: StatusError = { message, status, name: 'error' };
  return error;
};

export default class UserService {
  constructor(private userModel: typeof UserModel) {}

  public async login(email: string, password: string): Promise<string> {
    const Error4041 = 'All fields must be filled';
    const Error4042 = 'Incorrect email or password';

    if (!email || !password) throw catchError(400, Error4041);

    const result = await this.userModel.findOne({ where: { email } });

    if (result === null) throw catchError(401, Error4042);

    const validPass = Bcrypt.compare(password, result.password);
    if (!validPass) throw catchError(401, Error4042);

    if (email !== result.email) throw catchError(401, Error4042);

    const token = createToken({ email, password });
    return token;
  }

  public async getAll(): Promise<IUser[]> {
    const result = await this.userModel.findAll();
    return result;
  }
}
