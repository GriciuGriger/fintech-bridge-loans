import { Pool } from 'pg';
import { logger } from './logger';

// PostgreSQL connection
let pgPool: Pool | null = null;

export const connectPostgreSQL = async (): Promise<Pool> => {
  if (pgPool) {
    return pgPool;
  }

  const config = {
    host: process.env['POSTGRES_HOST'] || 'localhost',
    port: parseInt(process.env['POSTGRES_PORT'] || '5432'),
    database: process.env['POSTGRES_DB'] || 'fintech_loans',
    user: process.env['POSTGRES_USER'] || 'postgres',
    password: process.env['POSTGRES_PASSWORD'] || 'password',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  pgPool = new Pool(config);

  pgPool.on('error', (err) => {
    logger.error('PostgreSQL pool error:', err);
  });

  // Test connection
  try {
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();
    logger.info('✅ PostgreSQL connected successfully');
  } catch (error) {
    logger.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }

  return pgPool;
};

// MongoDB connection - disabled for now (will be added later)
// export const connectMongoDB = async (): Promise<void> => {
//   // MongoDB will be added in later phase
// };

// Main database connection function
export const connectDatabase = async (): Promise<void> => {
  await connectPostgreSQL();
  // MongoDB will be added later
};

// Get PostgreSQL pool
export const getPostgreSQLPool = (): Pool => {
  if (!pgPool) {
    throw new Error('PostgreSQL not connected. Call connectPostgreSQL() first.');
  }
  return pgPool;
};

// Graceful database disconnection
export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (pgPool) {
      await pgPool.end();
      logger.info('PostgreSQL pool closed');
    }
    // MongoDB will be added later
  } catch (error) {
    logger.error('Error during database disconnection:', error);
  }
};
