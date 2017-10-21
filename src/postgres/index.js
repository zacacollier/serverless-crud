// @flow
import pg from 'pg'
require('dotenv').config()

// eslint-disable-next-line
const {
  PGDATABASE,
  PGHOST,
  PGPASSWORD,
  PGPORT,
  PGUSER,
  PG_IDLE_TIMEOUT_MILLIS,
  PG_CONNECTION_TIMEOUT_MILLIS,
} = process.env

if (!PGDATABASE || !PGHOST || !PGPASSWORD || !PGPORT || !PGUSER) {

  throw new Error('notes: postgres: env vars are missing')

}

const pool = new pg.Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  binary: false,
  port: PGPORT,
  max: 20,
  idleTimeoutMillis: PG_IDLE_TIMEOUT_MILLIS || 6000,
  connectionTimeoutMillis: PG_CONNECTION_TIMEOUT_MILLIS || 2000,
})
export type Connection = Promise<pg.Client>
export default pool
