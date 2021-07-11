/**
 * FakeBackendOfAWV class
 *
 * @class FakeBackendOfAWV
 */
export default class FakeBackendOfAWV {
  static savedIllegalCitySearchCityJSON = {id: 'a', label: null, value: null};
  static savedCitySearchCityJSON = {
    id: '3',
    label: 'Dinklage',
    value: 'Dinklage',
  };
  static savedCitySearchResult = [FakeBackendOfAWV.savedCitySearchCityJSON];

  static savedStreetSearchResultStreetJSON = {
    id: '542',
    label: 'Bernhardstraße',
    value: 'Bernhardstraße',
    pamo: '4',
    siemer: '1',
    abfuhrbezirk: '1',
  };
  static savedStreetSearchResultString =
    '({"strassen":[' +
    JSON.stringify(FakeBackendOfAWV.savedStreetSearchResultStreetJSON) +
    ']});';
}
