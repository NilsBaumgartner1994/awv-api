'use strict';

import UrlHelper from './UrlHelper';
import FetchHelper from '../ignoreCoverage/FetchHelper';
import City from '../models/City';
import Street from '../models/Street';
import FieldHelper from './FieldHelper';

/**
 * DownloadHelper class
 *
 * @class DownloadHelper
 */
export default class DownloadHelper {
  static async searchCityOnly(year: number, citySearchName: string) {
    const url = UrlHelper.getCitySearchURL(citySearchName);
    const response = await FetchHelper.fetchWithCookie(
      url,
      year,
      null,
      null,
      null,
      null,
      null
    );
    const listOfCityJSON = await response.json();
    return DownloadHelper.transformCityResponceToClass(listOfCityJSON);
  }

  static transformCityResponceToClass(listOfCityJSON: any[]) {
    const cities = [];
    for (const cityJSON of listOfCityJSON) {
      const city = new City(
        parseInt(cityJSON.id),
        cityJSON.label,
        cityJSON.value
      );
      cities.push(city);
    }
    return cities;
  }

  //Response jQuery18308012909501872008_1616924580830({"strassen":[{"id":"542","label":"Bernhardstraße","value":"Bernhardstraße","pamo":"4","siemer":"1","abfuhrbezirk":"1"});
  static async searchStreetOnly(
    year: number,
    cityId: number,
    streetSearchContainsName: string
  ) {
    const url = UrlHelper.getStreetSearchURL(cityId, streetSearchContainsName);
    const response = await FetchHelper.fetchWithCookie(
      url,
      year,
      cityId,
      null,
      null,
      null,
      null
    );
    const answer = await response.text();
    const listOfStreetJSONRaw =
      DownloadHelper.extractStreetJSONResponse(answer);
    return DownloadHelper.transformStreetResponceToClass(listOfStreetJSONRaw);
  }

  static extractStreetJSONResponse(answer: any) {
    const substring = answer.substr(1, answer.length - (1 + 2)); //remove brackets and semicolon
    const streetJSON = JSON.parse(substring); // then parse to json
    return streetJSON['strassen'];
  }

  static transformStreetResponceToClass(listOfStreetJSON: any[]) {
    const streets = [];
    for (const streetJSON of listOfStreetJSON) {
      if (streetJSON.id !== 'false') {
        const street = new Street(
          parseInt(streetJSON.id),
          streetJSON.label,
          streetJSON.value,
          streetJSON.pamo,
          streetJSON.siemer,
          streetJSON.abfuhrbezirk
        );
        streets.push(street);
      }
    }
    return streets;
  }
}
