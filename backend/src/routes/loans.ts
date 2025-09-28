import { Router } from 'express';

const router = Router();

// GET /api/loans
router.get('/', (_req, res) => {
  res.json({ message: 'Get all loans endpoint - to be implemented' });
});

// GET /api/loans/:id
router.get('/:id', (_req, res) => {
  res.json({ message: 'Get loan by ID endpoint - to be implemented' });
});

// POST /api/loans
router.post('/', (_req, res) => {
  res.json({ message: 'Create loan endpoint - to be implemented' });
});

// PUT /api/loans/:id
router.put('/:id', (_req, res) => {
  res.json({ message: 'Update loan endpoint - to be implemented' });
});

// DELETE /api/loans/:id
router.delete('/:id', (_req, res) => {
  res.json({ message: 'Delete loan endpoint - to be implemented' });
});

export { router as loanRoutes };
