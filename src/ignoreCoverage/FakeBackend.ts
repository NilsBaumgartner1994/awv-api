'use strict';

/**
 * FakeBackend class
 *
 * @class FakeBackend
 */
export default class FakeBackend {
  static IS_ACTIVE = false;

  static async fakeFetch(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ) {
    return null;
  }
}
