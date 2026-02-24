// Rate limiting middleware to restrict users to 100 requests per minute
import { Request, Response, NextFunction } from 'express';

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const LIMIT = 100;
const TIME_FRAME = 60 * 1000; // 1 minute

export const rateLimitingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // Assuming user ID is stored in req.user after authentication
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const currentTime = Date.now();
    const userLimit = rateLimit.get(userId);

    if (userLimit) {
        const { count, timestamp } = userLimit;
        if (currentTime - timestamp < TIME_FRAME) {
            if (count >= LIMIT) {
                return res.status(429).json({ message: 'Too many requests' });
            }
            rateLimit.set(userId, { count: count + 1, timestamp });
        } else {
            rateLimit.set(userId, { count: 1, timestamp: currentTime });
        }
    } else {
        rateLimit.set(userId, { count: 1, timestamp: currentTime });
    }

    next();
};