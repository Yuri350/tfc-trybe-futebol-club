import UserModel from '../database/models/user.model';
import Bcrypt from '../middleware/bcrypt';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(email: string, password: string): Promise<string> {
    const result = await this.model.findOne(email);
    Bcrypt.compare(password, result.password);
    // token
    // retornar token
  }
}