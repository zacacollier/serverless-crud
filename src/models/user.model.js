// @flow
import * as Services from '../controllers'
import type {
  GetById,
} from '../controllers'
const {
  getAll,
  getById,
} = Services

const getUserDetailsOptions: GetById = {
  table: 'users',
  key: 'cognitoId',
  id: '',
}

export const getAllUsers = () =>
  getAll('users')
    .then(({ rows, client }) => ({ rows, client }))

export const getUserDetails = (cognitoId: string) =>
  getById({ ...getUserDetailsOptions, id: cognitoId })
    .then(({ rows, client }) => ({ rows, client }))
