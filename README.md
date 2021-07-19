<h2 align="center">
    AWV-API
</h2>

<p align="center">
  <a href="https://badge.fury.io/js/awv-api.svg"><img src="https://badge.fury.io/js/awv-api.svg" alt="npm package" /></a>
  <a href="https://img.shields.io/github/license/NilsBaumgartner1994/awv-api"><img src="https://img.shields.io/github/license/NilsBaumgartner1994/awv-api" alt="MIT" /></a>
  <a href="https://img.shields.io/github/last-commit/NilsBaumgartner1994/awv-api?logo=git"><img src="https://img.shields.io/github/last-commit/NilsBaumgartner1994/awv-api?logo=git" alt="last commit" /></a>
  <a href="https://www.npmjs.com/package/awv-api"><img src="https://img.shields.io/npm/dm/awv-api.svg" alt="downloads week" /></a>
  <a href="https://www.npmjs.com/package/awv-api"><img src="https://img.shields.io/npm/dt/awv-api.svg" alt="downloads total" /></a>
  <a href="https://github.com/NilsBaumgartner1994/awv-api"><img src="https://shields.io/github/languages/code-size/NilsBaumgartner1994/awv-api" alt="size" /></a>
  <a href="https://david-dm.org/NilsBaumgartner1994/awv-apig"><img src="https://david-dm.org/NilsBaumgartner1994/awv-api/status.svg" alt="dependencies" /></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FNilsBaumgartner1994%2Fawv-api?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FNilsBaumgartner1994%2Fawv-api.svg?type=shield"/></a>
  <a href="https://github.com/google/gts" alt="Google TypeScript Style"><img src="https://img.shields.io/badge/code%20style-google-blueviolet.svg"/></a>
  <a href="https://shields.io/" alt="Google TypeScript Style"><img src="https://img.shields.io/badge/uses-TypeScript-blue.svg"/></a>
  <a href="https://github.com/marketplace/actions/lint-action"><img src="https://img.shields.io/badge/uses-Lint%20Action-blue.svg"/></a>
</p>

<p align="center">
  <a href="https://github.com/NilsBaumgartner1994/awv-api/actions/workflows/npmPublish.yml"><img src="https://github.com/NilsBaumgartner1994/awv-api/actions/workflows/npmPublish.yml/badge.svg" alt="Npm publish" /></a>
  <a href="https://github.com/NilsBaumgartner1994/awv-api/actions/workflows/linter.yml"><img src="https://github.com/NilsBaumgartner1994/awv-api/actions/workflows/linter.yml/badge.svg" alt="Build status" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=alert_status" alt="Quality Gate" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=bugs" alt="Bugs" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=coverage" alt="Coverage" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=code_smells" alt="Code Smells" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=duplicated_lines_density" alt="Duplicated Lines (%)" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=sqale_rating" alt="Maintainability Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=reliability_rating" alt="Reliability Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=security_rating" alt="Security Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=sqale_index" alt="Technical Debt" /></a>
  <a href="https://sonarcloud.io/dashboard?id=NilsBaumgartner1994_awv-api"><img src="https://sonarcloud.io/api/project_badges/measure?project=NilsBaumgartner1994_awv-api&metric=vulnerabilities" alt="Vulnerabilities" /></a>
</p>

<p align="center">
    Abfallwirtschaft Vechta - API
</p>

## Disclaimer

This is not an official package from the "Abfallwirtschaft Vechta". It is only an API by parsing the informations from the website.

## About

Since https://www.abfallwirtschaft-vechta.de/ is not offering an open and simple api for their calendar of trash-pickup dates was this package created. It offers a possibility to download all trash-pickup events for a specific year, downloading all cities and streets and puts them in a nice object.

## Installation

```
npm install awv-api
```

## Usage

```
import {AwvAPI} from "awv-api";

const allCities = await AwvAPI.downloadAllCities(year);
//or any other Function
```

## Models

### City

```
city.id : number // the id of the city
city.label : string // the display name of the city
city.value : string // the name of the city
city.getStreets() : Street[] // returns all associated streets
```

### Street

```
street.id : number // the id of the street
street.label : string // the display name of the city
street.value : string // the name of the city
street.pamo: string // the district for pamo, 0 if not available
street.siemer: string // the district for siemer, 0 if not available
street.abfuhrbezirk: string // the district for the normal
street.getEvents() : Event[] // returns all associated events
```

### Event

```
event.date: string // the date as String DD.MM.YYYY when the event happens
event.label: string // the trash which gets picked up
event.provider: string // the name of the provider
```

### Provider

An enum:

```
VECHTA = 'AVZ Vechta'
SIEMER = 'Siemer'
PAMO = 'Pamo'
```

## Documentation

### params:

- year: number (for example: 2021)
- city: City (see /models/City.ts)
- street: Street (see /models/Street.ts)
- event: Event (see /models/Event.ts)

### functions

- AwvAPI.downloadAllCitiesAndStreetsAndEvents(year)

  - Downloads all cities and streets and events as a list of cities

- AwvAPI.downloadAllCitiesAndStreets(year)
  - Downloads all cities and streets
- AwvAPI.downloadAllCities(year)
  - Downloads all cities
- AwvAPI.downloadAllStreetsForCity(year, city)
  - Downloads all streets for a city
- AwvAPI.downloadEventsForStreet(year, city, street)
  - Downloads all events for a specific street in a city

## Contributors

<a href="https://github.com/NilsBaumgartner1994/firebolt-connector"><img src="https://contrib.rocks/image?repo=NilsBaumgartner1994/awv-api" alt="Contributors" /></a>
