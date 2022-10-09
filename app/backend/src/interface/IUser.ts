import ILogin from './ILogin';

interface IUser extends ILogin {
  id?: number,
  username: string,
}

export default IUser;
