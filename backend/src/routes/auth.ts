import { Router } from 'express';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Apply stricter rate limiting to auth routes
router.use(authRateLimiter);

// POST /api/auth/register
router.post('/register', (_req, res) => {
  res.json({ message: 'Register endpoint - to be implemented' });
});

// POST /api/auth/login
router.post('/login', (_req, res) => {
  res.json({ message: 'Login endpoint - to be implemented' });
});

// POST /api/auth/refresh
router.post('/refresh', (_req, res) => {
  res.json({ message: 'Refresh token endpoint - to be implemented' });
});

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.json({ message: 'Logout endpoint - to be implemented' });
});

export { router as authRoutes };
