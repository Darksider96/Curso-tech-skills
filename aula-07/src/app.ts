// src/app.ts

import { fetchAllCountries } from './utils/api';
import { CountryService } from './services/countryService';
import { CountryRegion } from './types';

const run = async () => {
  try {
    console.log('Buscando dados de países...');
    const allCountries = await fetchAllCountries();

    if (allCountries.length === 0) {
      console.log('Nenhum país encontrado.');
      return;
    }

    const countryService = new CountryService(allCountries);
    console.log(`Dados de ${allCountries.length} países carregados.`);

    // Teste 1: Pesquisa por nome (case-insensitive)
    console.log('\n--- Teste de Pesquisa (Brasil) ---');
    const brazil = countryService.searchByName('brasil');
    console.log(`Países encontrados: ${brazil.map(c => c.name.common).join(', ')}`);

    // Teste 2: Filtro por região (Europe)
    console.log('\n--- Teste de Filtro (Europa) ---');
    const europeanCountries = countryService.filterByRegion(CountryRegion.Europe);
    console.log(`Número de países na Europa: ${europeanCountries.length}`);
    console.log(`Exemplos: ${europeanCountries.slice(0, 5).map(c => c.name.common).join(', ')}`);

    // Teste 3: Combinando pesquisa e filtro (países da Ásia que contêm 'stan')
    console.log("\n--- Teste Combinado (Ásia e 'stan') ---");
    const asianCountries = countryService.filterByRegion(CountryRegion.Asia);
    const stanCountriesInAsia = new CountryService(asianCountries).searchByName('stan');
    console.log(`Países na Ásia com 'stan': ${stanCountriesInAsia.map(c => c.name.common).join(', ')}`);

  } catch (error) {
    console.error('Falha na execução da aplicação:', (error as Error).message);
  }
};

run();