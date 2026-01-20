import { ICountry, CountryRegion } from "../interface/country.interface";

export class CountryService {
    private countries: ICountry[] = []

    constructor(countries: ICountry[]) {
        this.countries = countries;
    }


    public searchByName(query: string): ICountry[] {
        const lowerCaseQuery = query.toLowerCase().trim();
        if (!lowerCaseQuery) {
            return this.countries;
        }

        return this.countries.filter(country =>
            country.name.common.toLowerCase().includes(lowerCaseQuery)
            );
    }

    public filterByRegion(region: CountryRegion): ICountry[] {
        return this.countries.filter(country => country.region === region);
    }
}
