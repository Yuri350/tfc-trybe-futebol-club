import UserModel from '../database/models/user.model';
import Bcrypt from '../middleware/Bcrypt';
import { createToken } from '../middleware/token';

export default class UserService {
  public static async login(input: { email: string, password: string }): Promise<string> {
    const result = await UserModel.findOne({ where: { email: input.email } });
    if (result === null) throw new Error('Incorrect email or password');

    const validPass = Bcrypt.compare(input.password, result.password);
    if (!validPass) throw new Error('Incorrect email or password');
    const token = createToken(input);
    return token;
  }
}
