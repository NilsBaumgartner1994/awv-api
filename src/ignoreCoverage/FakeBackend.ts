'use strict';

import Event from '../models/Event';
import {Provider} from '../models/Provider';
import UrlHelper from '../helper/UrlHelper';
import City from "../models/City";
import Street from "../models/Street";

/**
 * FakeBackend class
 *
 * @class FakeBackend
 */
export default class FakeBackend {
  static IS_ACTIVE = false;

  static getFakeEvents(){
    return FakeBackend.getFakeEventsResult(
        UrlHelper.CALENDAR_URL,
        2021,
        -1,
        -1,
        -1,
        -1,
        -1
    );
  }

  static getFakeEventsResult(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ): Event[] {
    let fakeEvents: Event[] = [
      new Event('05.01.' + year, 'Restabfall', Provider.VECHTA),
      new Event('12.01.' + year, 'Bioabfall', Provider.VECHTA),
      new Event('18.01.' + year, 'Gelbe Tonne', Provider.VECHTA),
      new Event('27.01.' + year, 'Altkleider', Provider.VECHTA),
      new Event('07.02.' + year, 'Mobile Schadstoff.', Provider.VECHTA),
    ];

    if (abfuhrbezirkpapier !== '0' || cityId === -1) {
      if (
        papier === UrlHelper.getProviderSearchField(Provider.PAMO) ||
        cityId === -1
      ) {
        fakeEvents.push(new Event('10.02.' + year, 'Altpapier', Provider.PAMO));
      }
      if (
        papier === UrlHelper.getProviderSearchField(Provider.SIEMER) ||
        cityId === -1
      ) {
        fakeEvents.push(
          new Event('19.02.' + year, 'Altpapier', Provider.SIEMER)
        );
      }
    }

    return fakeEvents;
  }

  static async returnFakeEventsRequest(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ) {
    let fakeEvents = FakeBackend.getFakeEventsResult(
      url,
      year,
      cityId,
      streetId,
      abfuhrbezirkId,
      papier,
      abfuhrbezirkpapier
    );
    return {
      text: () => {
        let html = '<span class="an_other_class">01.02. : Restmüll</span>'; //to be ignored
        for (let event of fakeEvents) {
          let dateString = event.date.substr(0, 5);
          let label = event.label;
          html +=
            '<span class="month_termin">' +
            dateString +
            ' : ' +
            label +
            '</span>';
        }
        return html;
      },
    };
  }

  static getFakeCities() : City[]{
    return [new City(3, "Dinklage", "Dinklage")];
  }

  static returnFakeCitySearchRequest(    url: string,
                                         year: number,
                                         cityId: any,
                                         streetId: any,
                                         abfuhrbezirkId: any,
                                         papier: any,
                                         abfuhrbezirkpapier: any){
    return {
      json: () => {
        let fakeCities = FakeBackend.getFakeCities();
        let cityList = [];
        for(let city of fakeCities){
          cityList.push({
            "id": city.id+"",
            "label": city.label,
            "value": city.value
          });
        }

        return cityList;
      }
    }
  }

  static getFakeStreets() : Street[]{
    return [new Street(354, "Musterstrasse", "Musterstrasse", "1", "2", "1")];
  }

  static returnFakeStreetSearchRequest(    url: string,
                                           year: number,
                                           cityId: any,
                                           streetId: any,
                                           abfuhrbezirkId: any,
                                           papier: any,
                                           abfuhrbezirkpapier: any){
    return {
      text: () => {
        let fakeStreets = FakeBackend.getFakeStreets();
        let streetList: any = [];
        for(let street of fakeStreets){
          streetList.push({
            id:street.id+"",
            label:street.label,
            value:street.value,
            pamo:street.pamo,
            siemer:street.siemer,
            abfuhrbezirk:street.abfuhrbezirk
          });
        }
        let streetsJSON = {strassen: streetList};
        let response = "("+JSON.stringify(streetsJSON)+");";
        return response;
      }
    }
  }

  static async fakeFetch(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ) {
    if(url.startsWith(UrlHelper.SEARCH_STREET_BASE_URL)){
      return FakeBackend.returnFakeStreetSearchRequest( url,
          year,
          cityId,
          streetId,
          abfuhrbezirkId,
          papier,
          abfuhrbezirkpapier);
    }
    if(url.startsWith(UrlHelper.SEARCH_CITY_URL)){
      return FakeBackend.returnFakeCitySearchRequest(        url,
          year,
          cityId,
          streetId,
          abfuhrbezirkId,
          papier,
          abfuhrbezirkpapier);
    } else if (url === UrlHelper.CALENDAR_URL) {
      return FakeBackend.returnFakeEventsRequest(
        url,
        year,
        cityId,
        streetId,
        abfuhrbezirkId,
        papier,
        abfuhrbezirkpapier
      );
    }

    return null;
  }
}
