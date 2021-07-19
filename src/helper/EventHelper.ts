'use strict';

import Event from "../models/Event";
import {EventLabels} from "../models/EventLabels";
import {Provider} from "../models/Provider";

/**
 * FieldHelper class
 *
 * @class FieldHelper
 */
export default class EventHelper {

  static isPapier(event: Event){
    return event.label===EventLabels.PAPIER;
  }

  static isPapierPamo(event: Event){
    return EventHelper.isPapier(event) && event.provider===Provider.PAMO;
  }

  static isPapierSiemer(event: Event){
    return EventHelper.isPapier(event) && event.provider===Provider.SIEMER;
  }

  static isAltkleider(event: Event){
    return event.label===EventLabels.ALTKLEIDER;
  }

  static isBioabfall(event: Event){
    return event.label===EventLabels.BIOABFALL;
  }

  static isGelbeTonne(event: Event){
    return event.label===EventLabels.GELBE_TONNE;
  }

  static isRestabfall(event: Event){
    return event.label===EventLabels.RESTABFALL;
  }

  static isSchadstoff(event: Event){
    return event.label===EventLabels.SCHADSTOFF;
  }

}
