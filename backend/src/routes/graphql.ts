import { Router } from 'express';

const router = Router();

// GraphQL endpoint placeholder
router.all('/', (_req, res) => {
  res.json({ 
    message: 'GraphQL endpoint - to be implemented',
    note: 'This will be replaced with Apollo Server GraphQL endpoint'
  });
});

export { router as graphqlRoutes };
