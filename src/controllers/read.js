// @flow
// import debug from 'debug'
import pool from '../postgres'
import type { Client } from '../postgres'
import type { Table } from './'
import type {
  GetById,
  PGResponse,
  ServiceResponse,
} from './'

// const log = debug('notes:services:read')

const getAllQuery = (table: Table) => `
  SELECT * FROM ${table};
`
const getByIdQuery = ({ table, key, id }: GetById) => `
  SELECT * FROM ${table}
  WHERE (${table}.${key} = '${id}');
`

// TODO: pg flow declares
export const getAll = (table: Table): Promise<ServiceResponse> =>
  pool.connect()
    .then((client: Client) =>
      client.query(getAllQuery(table))
        .then(({ rows }: PGResponse): ServiceResponse =>
          ({ rows, client })
        )
        .catch((err) => new Error(err))
    )
    .catch(err => new Error(err))


export const getById = (options: GetById): Promise<ServiceResponse> =>
  pool.connect()
    .then((client: Client) =>
      client.query(getByIdQuery({ ...options }))
        .then(({ rows }: PGResponse) =>
          ({ rows, client })
        )
        .catch((err) => new Error(err))
    )
    .catch(err => new Error(err))

// getAll('users').then(res => log(res))
// getById({
//   table: 'notes',
//   key: 'author',
//   id: 'larry_david_cognito_id',
// }).then(res => log(res))
