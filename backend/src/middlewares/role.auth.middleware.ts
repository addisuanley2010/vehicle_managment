import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

const roleAuth = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!req.user.role) {
      return res.status(403).json({ success: false, message: 'User role not defined' });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
    }
  };
};

export default roleAuth;
