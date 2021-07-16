import Event from "../models/Event";

export default class EventFilterHelper{

    static eventToComparableString(event: Event) : string{
        return event.date+"$"+event.label; //the informations from the website are only date and label
        //so we cant use anything else to use for a comparable string
    }

    static isEventInDictOfEvents(event : Event, dictOfEvents: { [key: string] : Event}) : boolean {
        const key: string = EventFilterHelper.eventToComparableString(event);
        return !!dictOfEvents[key];
    }

    static parseListOfEventsToDict(listOfEvents : Event[]) : { [key: string] : Event} {
        let dictDateLabelStrings: { [key: string] : Event; } = {};
        for(let event of listOfEvents){
            const key : string = EventFilterHelper.eventToComparableString(event);
            dictDateLabelStrings[key] = event;
        }
        return dictDateLabelStrings;
    }

    static sortListOfEvents(listOfEvents: Event[]){
        listOfEvents.sort(EventFilterHelper.compareEvent);
        return listOfEvents;
    }

    static compareEvent(a : Event, b : Event){
        let dateOfA = a.getDate();
        let dateOfB = b.getDate();
        return dateOfA.getTime()-dateOfB.getTime();
    }
}