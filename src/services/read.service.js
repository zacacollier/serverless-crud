// @flow
// import debug from 'debug'
import pool from '../postgres'
import type { Connection } from '../postgres'
import type {
  GetById,
  PGResponse,
  ServiceResponse,
} from './'

// const log = debug('notes:services:read')

const getAllQuery = (table: string) => `
  SELECT * FROM ${table};
`
const getByIdQuery = ({ table, key, id }: GetById) => `
  SELECT * FROM ${table}
  WHERE (${table}.${key} = '${id}');
`

// TODO: pg flow declares
export const getAll = (table: string): Promise<Connection> =>
  pool.connect()
    .then((client) => {

      return client.query(getAllQuery(table))
        .then(({ rows }: PGResponse): ServiceResponse =>
          ({
            rows,
            client,
          })
        )
        .catch((err) => new Error(err))

    })
    .catch(err => new Error(err))


export const getById = (options: GetById): Promise<*> =>
  pool.connect()
    .then((client) => {

      return client.query(getByIdQuery({ ...options }))
        .then(({ rows }) =>
          ({ rows, client })
        )
        .catch((err) => new Error(err))

    })
    .catch(err => new Error(err))

// getAll('users').then(res => log(res))
// getById({
//   table: 'notes',
//   key: 'author',
//   id: 'larry_david_cognito_id',
// }).then(res => log(res))
