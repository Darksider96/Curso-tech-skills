// src/utils/api.ts
import axios, { AxiosResponse } from 'axios';
import { ICountry } from '../types';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<ICountry[]> => {
  try {
    const response: AxiosResponse<ICountry[]> = await axios.get(`${BASE_URL}/all?fields=name,region,capital,population,flags`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Erro ao buscar países: ${error.message}`);
      throw new Error('Falha ao conectar à API de países.'); // Adicione esta linha
    } else {
      console.error(`Erro inesperado: ${error}`);
      throw new Error('Ocorreu um erro inesperado.'); // Adicione esta linha
    }
  }
};