import { RequestHandler } from 'express';
import { tokenValidationAux } from './token';

const validation:RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const result = tokenValidationAux(authorization);

    req.body.user = result;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validation;
