// @flow
import debug from 'debug'
import query from '../postgres'
import type {
  Table,
  Fields,
} from './'

const log = debug('notes:services:create')

export const create = (table: Table, fields: Fields): Promise<*> =>
  query.insert(fields, 'id')
    .into(table)
    .then((res) => log(res))
    .catch((err) => log(err))
