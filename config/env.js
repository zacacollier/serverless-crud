const dotenv = require('dotenv')

dotenv.config()

module.exports.env = () => ({
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT || 5432,
  COGNITO_POOL_ID: process.env.COGNITO_POOL_ID,
})
