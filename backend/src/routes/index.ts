import { Express } from 'express';
import { authRoutes } from './auth';
import { userRoutes } from './users';
import { loanRoutes } from './loans';
import { investmentRoutes } from './investments';
import { graphqlRoutes } from './graphql';
import { rateLimiter } from '../middleware/rateLimiter';

export const setupRoutes = (app: Express): void => {
  // Apply rate limiting to all routes
  app.use('/api', rateLimiter);

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/loans', loanRoutes);
  app.use('/api/investments', investmentRoutes);
  
  // GraphQL endpoint
  app.use('/graphql', graphqlRoutes);

  // API documentation endpoint
  app.get('/api', (_req, res) => {
    res.json({
      message: 'FinTech Bridge Loans API',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        loans: '/api/loans',
        investments: '/api/investments',
        graphql: '/graphql'
      },
      documentation: 'https://github.com/your-repo/docs'
    });
  });
};
