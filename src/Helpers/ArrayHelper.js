import * as _ from 'lodash'

export class ArrayHelper {
  static remove(array, item) {
    const toRemove = Array.isArray(item) ? item : [item]
    _.remove(array, item => toRemove.indexOf(item) > -1)

    return array
  }

  static concat(a, b) {
    return _.concat(a, b)
  }
}
