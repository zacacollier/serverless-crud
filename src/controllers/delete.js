// @flow
import pool from '../postgres'
import type { Client } from '../postgres'
import type {
  PGResponse,
  ServiceResponse,
  Table,
  Fields,
} from './'

const deleteRowQuery = ({ id, table }) =>
  id
    ? `DELETE FROM ${table} where id = ${id};`
    : new Error('delete: no id provided')

export const deleteById = (table: Table, { id }: Fields): Promise<ServiceResponse> =>
  pool.connect()
    .then((client: Client) =>
      client.query(deleteRowQuery({ id, table }))
        .then(({ rows }: PGResponse): ServiceResponse =>
          ({ rows, client })
        )
        .catch((error) => new Error(error))
    )
    .catch((error) => new Error(error))
