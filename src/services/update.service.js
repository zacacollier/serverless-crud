// @flow
import query from '../postgres'
import type {
  Table,
  Fields,
  ResourceId,
} from './'

export const update = (table: Table, fields: Fields, id: ResourceId) =>
  query(table)
    .where('id', '=', id)
    .update({ ...fields })
    .then((res) => res)
    .catch((err) => err)
