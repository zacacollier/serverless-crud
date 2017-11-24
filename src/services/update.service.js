// @flow
import pool from '../postgres'
import type { Client } from '../postgres'
import type {
  Table,
  Fields,
  ServiceResponse,
  PGResponse,
} from './'

export const update = (
  table: Table,
  fields: Fields,
  query: (Fields) => string
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
