"use strict";
// src/app.ts
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./utils/api");
const countryService_1 = require("./services/countryService");
const types_1 = require("./types");
const run = async () => {
    try {
        console.log('Buscando dados de países...');
        const allCountries = await (0, api_1.fetchAllCountries)();
        if (allCountries.length === 0) {
            console.log('Nenhum país encontrado.');
            return;
        }
        const countryService = new countryService_1.CountryService(allCountries);
        console.log(`Dados de ${allCountries.length} países carregados.`);
        // Teste 1: Pesquisa por nome (case-insensitive)
        console.log('\n--- Teste de Pesquisa (Brasil) ---');
        const brazil = countryService.searchByName('brasil');
        console.log(`Países encontrados: ${brazil.map(c => c.name.common).join(', ')}`);
        // Teste 2: Filtro por região (Europe)
        console.log('\n--- Teste de Filtro (Europa) ---');
        const europeanCountries = countryService.filterByRegion(types_1.CountryRegion.Europe);
        console.log(`Número de países na Europa: ${europeanCountries.length}`);
        console.log(`Exemplos: ${europeanCountries.slice(0, 5).map(c => c.name.common).join(', ')}`);
        // Teste 3: Combinando pesquisa e filtro (países da Ásia que contêm 'stan')
        console.log("\n--- Teste Combinado (Ásia e 'stan') ---");
        const asianCountries = countryService.filterByRegion(types_1.CountryRegion.Asia);
        const stanCountriesInAsia = new countryService_1.CountryService(asianCountries).searchByName('stan');
        console.log(`Países na Ásia com 'stan': ${stanCountriesInAsia.map(c => c.name.common).join(', ')}`);
    }
    catch (error) {
        console.error('Falha na execução da aplicação:', error.message);
    }
};
run();
//# sourceMappingURL=app.js.map