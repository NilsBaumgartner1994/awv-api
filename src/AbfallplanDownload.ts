/* istanbul ignore file */
const fetch = require('node-fetch');

export default class AbfallplanDownload {
  //Response: [{"id":"3","label":"Dinklage","value":"Dinklage"}]
  static async searchCity(year: any, citySearch: any) {
    return null;
  }

  static baseURL = 'https://www.abfallwirtschaft-vechta.de/CALENDER';

  //Response jQuery18308012909501872008_1616924580830({"strassen":[{"id":"542","label":"Bernhardstraße","value":"Bernhardstraße","pamo":"4","siemer":"1","abfuhrbezirk":"1"});
  static async searchStreet(year: any, cityId: any, streetSearch: any) {
    return null;
  }
}
