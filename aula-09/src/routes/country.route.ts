const express = require('express');
const routes = express.Router();
const countryController = require('../controllers/countryController');

routes.get('/', (countryController.getAllCountries));

routes.get('/:name', (countryController.getCountryByName));

routes.get('/capital/:capital', (countryController.getCountryByCapital));

routes.get('/region/:region', (countryController.getCountryByRegion));

routes.get('/population/:population', (countryController.getCountryByPopulation));

routes.get('/currency/:currency', (countryController.getCountryByCurrency));

routes.get('/language/:language', (countryController.getCountryByLanguage));

routes.get('/border/:border', (countryController.getCountryByBorder));

routes.get('/code/:code', (countryController.getCountryByCode));

routes.get('/callingCode/:callingCode', (countryController.getCountryByCallingCode));

routes.get('/subregion/:subregion', (countryController.getCountryBySubregion));

routes.get('/filter/:filter', (countryController.getCountryByFilter));

module.exports = routes;