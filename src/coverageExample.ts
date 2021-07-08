'use strict';

/**
 * CoverageExample class
 *
 * @class CoverageExample
 */
export default class CoverageExample {
  /**
   * Creates an instance of CoverageExample.
   *
   * @param {Object} options
   *
   * @memberof CoverageExample
   */
  constructor(options: any) {
    console.log('Create a new CoverageExample instance');
  }

  run(number: number) {
    if (number > 40) {
      return true;
    } else {
      if (number < 10) {
        if (number < 4) {
          return 'quality gate computed';
        } else {
          return 'go';
        }
      }
    }
  }
}
