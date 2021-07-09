'use strict';

import FetchHelper from "./FetchHelper";

/**
 * Server class
 *
 * @class FetchHelper
 */
export default class AwvAPI {

  static BASE_URL = "https://www.abfallwirtschaft-vechta.de/CALENDER";
  static CALENDAR_URL = AwvAPI.BASE_URL+"/inc.get_calender.php";

  constructor() {

  }

  static async downloadAllCities(year){
    return await AbfallplanDownload.searchCity(year, "");
  }

  static async downloadAllStreetsInCity(year, city){
    let streetResponse = await AbfallplanDownload.searchStreet(year, city.id, "");
    return streetResponse;
  }


  static async downloadKalendar(year, cityId, streetId, abfuhrbezirkId, papier, abfuhrbezirkpapier){
    let url = AwvAPI.baseURL+"/inc.get_calender.php";
    let answer = [];

    try{
      let response = await FetchHelper.fetchWithCookie(url, year, cityId, streetId, abfuhrbezirkId, papier, abfuhrbezirkpapier);
      let html = await response.text();
      const root = parse(html);
      let elements = root.querySelectorAll("span");
      //console.log("elements: "+elements.length);
      for(let i=0; i<elements.length; i++){
        let element = elements[i];
        if(element.classList.contains("month_termin")){
          let text = element.text; // 05.01 : Restabfall
          let split = text.split(" : ");
          let dateAsString = split[0]+"."+year;
          let garbage = split[1];
          let event = {
            date: dateAsString,
            label: garbage
          }
          answer.push(event);
        }
      }

      return answer;
    } catch (err){
      console.log(err);
    }
    return null;
  }

}
