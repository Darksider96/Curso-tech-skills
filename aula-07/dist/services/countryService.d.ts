import { ICountry, CountryRegion } from '../types';
export declare class CountryService {
    private countries;
    constructor(countries: ICountry[]);
    searchByName(query: string): ICountry[];
    filterByRegion(region: CountryRegion): ICountry[];
}
//# sourceMappingURL=countryService.d.ts.map