import UserModel from '../database/models/user.model';
import Bcrypt from '../middleware/Bcrypt';
import { createToken } from '../middleware/token';

interface StatusError extends Error {
  message: string,
  status: number,
}

const nome1 = (status: number, message: string) => {
  const error: StatusError = { message, status, name: 'error' };
  return error;
};

export default class UserService {
  public static async login(input: { email: string, password: string }): Promise<string> {
    const result = await UserModel.findOne({ where: { email: input.email } });
    if (result === null) throw nome1(400, 'Incorrect email or password');

    const validPass = Bcrypt.compare(input.password, result.password);
    if (!validPass) throw nome1(400, 'Incorrect email or password');
    const token = createToken(input);
    return token;
  }
}
