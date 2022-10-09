// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import ILogin from '../interface/ILogin';

// require('dotenv').config();
import 'dotenv/config';

// const { JWT_SECRET } = process.env;
const JWT_SECRET = process.env.JWT_SECRET as string;

function createToken(payload: ILogin) {
  const JWTOP: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '20d',
  };

  const token = jwt.sign({ data: payload }, JWT_SECRET, JWTOP);
  return token;
}

function tokenValidationAux(token: string) {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
}

// const token = (payload) => {
//   const result = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });
//   return result;
// };

// const tokenValidation = (el) => {
//   const result = jwt.verify(el, JWT_SECRET);
//   return result;
// };

export { createToken, tokenValidationAux };
