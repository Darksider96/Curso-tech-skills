"use strict";
// src/services/countryService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
class CountryService {
    constructor(countries) {
        this.countries = [];
        this.countries = countries;
    }
    // Pesquisa por nome
    searchByName(query) {
        const lowerCaseQuery = query.toLowerCase().trim();
        if (!lowerCaseQuery) {
            return this.countries;
        }
        return this.countries.filter(country => country.name.common.toLowerCase().includes(lowerCaseQuery));
    }
    // Filtra por região
    filterByRegion(region) {
        return this.countries.filter(country => country.region === region);
    }
}
exports.CountryService = CountryService;
//# sourceMappingURL=countryService.js.map