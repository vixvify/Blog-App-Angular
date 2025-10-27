import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    jwt.verify(token, process.env['JWT_SECRET'] as string);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
