// src/services/countryService.ts

import { ICountry, CountryRegion } from '../types';

export class CountryService {
  private countries: ICountry[] = [];

  constructor(countries: ICountry[]) {
    this.countries = countries;
  }

  // Pesquisa por nome
  public searchByName(query: string): ICountry[] {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
      return this.countries;
    }

    return this.countries.filter(country =>
      country.name.common.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Filtra por região
  public filterByRegion(region: CountryRegion): ICountry[] {
    return this.countries.filter(country => country.region === region);
  }
}