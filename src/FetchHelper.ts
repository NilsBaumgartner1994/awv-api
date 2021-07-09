'use strict';
const fetch = require('node-fetch');

/**
 * Server class
 *
 * @class FetchHelper
 */
export default class FetchHelper {
  static getCookie(
    year: string,
    cityId: string,
    streetId: string,
    abfuhrbezirkId: string,
    papier: string,
    abfuhrbezirkpapier: string
  ) {
    return [
      'jahr=' +
        year +
        '; stadt=' +
        cityId +
        '; strasse=' +
        streetId +
        '; abfuhrbezirk=' +
        abfuhrbezirkId +
        '; papier=' +
        papier +
        '; abfuhrbezirkpapier=' +
        abfuhrbezirkpapier,
    ];
  }

  static async fetchWithCookie(
    url: string,
    year: string,
    cityId: string,
    streetId: string,
    abfuhrbezirkId: string,
    papier: string,
    abfuhrbezirkpapier: string
  ) {
    const cookie = FetchHelper.getCookie(
      year,
      cityId,
      streetId,
      abfuhrbezirkId,
      papier,
      abfuhrbezirkpapier
    );
    return await fetch(url, {
      method: 'GET',
      headers: {
        cookie: cookie,
      },
    });
  }
}
