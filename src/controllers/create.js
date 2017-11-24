// @flow
// import debug from 'debug'
import pool from '../postgres'
import type { Client } from '../postgres'
import type {
  PGResponse,
  ServiceResponse,
} from '../controllers'
import type {
  Table,
  Fields,
} from './'

// const log = debug('notes:services:create')

export const createOrUpdate = (
  table: Table,
  fields: Fields,
  query: (Fields) => string | Error
): Promise<ServiceResponse> =>
  pool.connect()
    .then((client: Client) =>
      client.query(query(fields))
        .then(({ rows }: PGResponse): ServiceResponse =>
          ({ rows, client })
        )
        .catch((error) => new Error(error))
    )
    .catch((error) => new Error(error))
