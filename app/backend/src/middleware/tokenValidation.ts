import { RequestHandler } from 'express';
import { tokenValidationAux } from './token';

const validation:RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const result = tokenValidationAux(authorization);

    console.log('result ----->', result);
    req.body.user = result;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validation;

// export default class tokenValidation {
//   public validation:RequestHandler = async (req, res, next) => {
//     const { authorization } = req.headers;
//     try {
//       if (!authorization) return res.status(401).json({ message: 'Token not found' });
//       const result = tokenValidationAux(authorization);

//       console.log('result ----->', result);
//       req.body.user = result;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Expired or invalid token' });
//     }
//   };
// }
