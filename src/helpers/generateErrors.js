// @flow
import { isNil } from 'lodash'

export const generateErrors = (requiredFields: Array<string>, values: Object) => {

  const errors = {}
  requiredFields.forEach((field) => {

    if (values[field] === '' || isNil(values[field])) {
      errors[field] = `${field} is required`
    }

  })
  return errors

}
