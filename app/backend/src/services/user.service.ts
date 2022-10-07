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
  public static async login(input: { email: string, password: string }): Promise<string> {
    const Error4041 = 'All fields must be filled';
    const Error4042 = 'Incorrect email or password';

    const result = await UserModel.findOne({ where: { email: input.email } });
    if (result === null) throw catchError(400, Error4041);

    const validPass = Bcrypt.compare(input.password, result.password);
    if (!validPass) throw catchError(400, Error4041);

    if (input.email !== result.email) throw catchError(401, Error4042);
    if (input.password !== result.password) throw catchError(401, Error4042);

    const token = createToken(input);
    return token;
  }
}
