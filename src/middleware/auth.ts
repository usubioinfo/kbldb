import { Request, Response, NextFunction } from 'express';

const token = process.env.AUTH_TOKEN as string;

export const authMethod = (req: Request, res: Response, next: NextFunction) => {
  if (req.header('kbl-token') === token) {
    next();
  }

  res.status(401).send('Unauthorized');
}