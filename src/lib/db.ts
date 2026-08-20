import { Pool } from 'pg';

let pool: Pool;

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const isCloudOrProd =
  process.env.NODE_ENV === 'production' ||
  connectionString.includes('neon.tech') ||
  connectionString.includes('sslmode=require') ||
  connectionString.includes('aws.neon.tech');

const poolConfig = {
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: isCloudOrProd ? { rejectUnauthorized: false } : undefined,
};

if (process.env.NODE_ENV === 'production') {
  pool = new Pool(poolConfig);
} else {
  // In development, preserve pool across hot reloads
  if (!global._pgPool) {
    global._pgPool = new Pool(poolConfig);
  }
  pool = global._pgPool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 500) {
      console.log('Slow PostgreSQL query executed:', { text, duration, rows: res.rowCount });
    }
    return res.rows;
  } catch (error) {
    console.error('PostgreSQL query error:', { text, error });
    throw error;
  }
}

export { pool };
