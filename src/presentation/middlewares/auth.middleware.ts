import { NextFunction, Response } from 'express';

import { AuthenticatedRequest } from '../../shared/types/ExpressRequest';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Token not provided',
      });
    }

    const token = authHeader.split(' ')[1];

    const tokenService = new JwtTokenService();

    const decoded = tokenService.verify(token);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};