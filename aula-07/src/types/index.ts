// src/types/index.ts

// Enum para as regiões
export enum CountryRegion {
    Africa = 'Africa',
    Americas = 'Americas',
    Asia = 'Asia',
    Europe = 'Europe',
    Oceania = 'Oceania',
  }
  
  // Interfaces para a tipagem dos dados da API
  export interface ICountryFlag {
    png: string;
    svg: string;
    alt: string;
  }
  
  export interface ICountryName {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  }
  
  export interface ICountry {
    name: ICountryName;
    region: CountryRegion;
    capital?: string[];
    population: number;
    flags: ICountryFlag;
  }