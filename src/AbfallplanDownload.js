import FetchHelper from "./FetchHelper";

const fetch = require("node-fetch");
import { parse } from 'node-html-parser';

export default class AbfallplanDownload {

    static PROVIDER_VECHTA = "AVZ Vechta";
    static PROVIDER_SIEMER = "siemer";
    static PROVIDER_PAMO = "pamo";

    static async downloadDatabase(){
        console.log("DownloadMyHome");

        /**
        let city = 3;
        let street = 542;
        let abfuhrbezirk = 1
        let papier = "siemer";
        let abfuhrbezirkpapier = 1;
        return await AbfallplanDownload.downloadKalendar(year, city, street, abfuhrbezirk, papier, abfuhrbezirkpapier);
         */
    }



    //Response: [{"id":"3","label":"Dinklage","value":"Dinklage"}]
    static async searchCity(year, citySearch){
        let url = AbfallplanDownload.baseURL+"/inc.suche_stadt.php?term="+citySearch;

        try{
            let response = await AbfallplanDownload.fetchWithCookie(url, year, "","", "", "", "");
            let answer = await response.json();
            return answer;
        } catch (err){
            console.log(err);
        }
        return null;
    }

    static baseURL = "https://www.abfallwirtschaft-vechta.de/CALENDER";

    //Response jQuery18308012909501872008_1616924580830({"strassen":[{"id":"542","label":"Bernhardstraße","value":"Bernhardstraße","pamo":"4","siemer":"1","abfuhrbezirk":"1"});
    static async searchStreet(year, cityId, streetSearch){
        let url = AbfallplanDownload.baseURL+"/inc.suche_strasse.php?stadt="+cityId+"&term="+streetSearch;

        try{
            let response = await AbfallplanDownload.fetchWithCookie(url, year, cityId,"", "", "", "");
            let answer = await response.text();
            // ({"strassen":[{"id":"542","label":"Bernhardstraße","value":"Bernhardstraße","pamo":"4","siemer":"1","abfuhrbezirk":"1"}]});
            //remove ( and );
            answer = answer.substr(1,answer.length-(1+2));
            // then parse to json
            answer = JSON.parse(answer);

            return answer["strassen"];
        } catch (err){
            console.log(err);
        }
        return null;
    }



    static getCookie(year, cityId, streetId, abfuhrbezirkId, papier, abfuhrbezirkpapier){
        let cookie = ["jahr="+year+"; stadt="+cityId+"; strasse="+streetId+"; abfuhrbezirk="+abfuhrbezirkId+"; papier="+papier+"; abfuhrbezirkpapier="+abfuhrbezirkpapier];
        return cookie;
    }

    /**
     * Receives two list of Events an returns the subtracted list
     * @param avzVechtaEvents [{date: A, label B}]
     * @param eventsOfProvider [{date: A, label B}, {date: A, label C}, {date: D, label G}]
     * @returns [{date: A, label C}, {date: D, label G}]
     */
    static filterEventsFromList(avzVechtaEvents, eventsOfProvider){
        let vechtaDateLabelStrings = AbfallplanDownload.parseListOfEventsToDictDateSeperatorLabel(avzVechtaEvents);
        let providerDateLabelStrings = AbfallplanDownload.parseListOfEventsToDictDateSeperatorLabel(eventsOfProvider);

        let listOfKeys = Object.keys(vechtaDateLabelStrings);
        for(let i=0; i<listOfKeys.length; i++){
            let key = listOfKeys[i];
            delete providerDateLabelStrings[key];
        }

        return AbfallplanDownload.parseDictDateSeperatorLabelToListOfEvents(providerDateLabelStrings);
    }

    static DICT_SEPERATOR_LABEL = "$";

    static parseListOfEventsToDictDateSeperatorLabel(listOfEvents){
        let dictDateLabelStrings = {};
        for(let i=0; i<listOfEvents.length; i++){
            let event = listOfEvents[i];
            let date = event.date;
            let label = event.label;
            dictDateLabelStrings[date+AbfallplanDownload.DICT_SEPERATOR_LABEL+label] = true;
        }
        return dictDateLabelStrings;
    }

    static parseDictDateSeperatorLabelToListOfEvents(dictDateLabelStrings){
        let events = [];
        let keys = Object.keys(dictDateLabelStrings);
        for(let i=0; i<keys.length; i++){
            let key = keys[i];
            let split = key.split(AbfallplanDownload.DICT_SEPERATOR_LABEL);
            let date = split[0];
            let label = split[1];
            events.push({
                date: date,
                label: label
            });
        }
        return events;
    }

    static async downloadKalendar(year, cityId, streetId, abfuhrbezirkId, papier, abfuhrbezirkpapier){
        let url = AbfallplanDownload.baseURL+"/inc.get_calender.php";
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
