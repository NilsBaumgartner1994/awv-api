'use strict';

import UrlHelper from "./UrlHelper";
import FetchHelper from "../ignoreCoverage/FetchHelper";
import City from "../models/City";
import Street from "../models/Street";
import FieldHelper from "./FieldHelper";

/**
 * DownloadHelper class
 *
 * @class DownloadHelper
 */
export default class DownloadHelper {

  static async searchCityOnly(year: number, citySearchName: string){
    let url = UrlHelper.getCitySearchURL(citySearchName);
    let response = await FetchHelper.fetchWithCookie(url, year, null,null, null, null, null);
    let listOfCityJSON = await response.json();
    return DownloadHelper.transformCityResponceToClass(listOfCityJSON);
  }

  static transformCityResponceToClass(listOfCityJSON: any[]){
    let cities = [];
    for(let cityJSON of listOfCityJSON){
        let city = new City(parseInt(cityJSON.id), cityJSON.label, cityJSON.value);
        cities.push(city);
    }
    return cities;
  }

  //Response jQuery18308012909501872008_1616924580830({"strassen":[{"id":"542","label":"Bernhardstraße","value":"Bernhardstraße","pamo":"4","siemer":"1","abfuhrbezirk":"1"});
  static async searchStreetOnly(year: number, cityId: number, streetSearchContainsName: string){
    let url = UrlHelper.getStreetSearchURL(cityId, streetSearchContainsName);
    let response = await FetchHelper.fetchWithCookie(url, year, cityId,null, null, null, null);
    let answer = await response.text();
    let listOfStreetJSONRaw = DownloadHelper.extractStreetJSONResponse(answer);
    console.log(listOfStreetJSONRaw);
    return DownloadHelper.transformStreetResponceToClass(listOfStreetJSONRaw);
  }

  static extractStreetJSONResponse(answer: any){
    let substring = answer.substr(1,answer.length-(1+2)); //remove brackets and semicolon
    let streetJSON = JSON.parse(substring); // then parse to json
    return streetJSON["strassen"];
}

  static transformStreetResponceToClass(listOfStreetJSON: any[]){
    let streets = [];
    for(let streetJSON of listOfStreetJSON){
      if(streetJSON.id!=='false') {
        let street = new Street(parseInt(streetJSON.id), streetJSON.label, streetJSON.value, streetJSON.pamo, streetJSON.siemer, streetJSON.abfuhrbezirk);
        streets.push(street);
      }
    }
    return streets;
  }

}
