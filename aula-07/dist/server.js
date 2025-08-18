"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const api_1 = require("./utils/api");
const countryService_1 = require("./services/countryService");
const types_1 = require("./types");
const app = (0, express_1.default)();
const PORT = 3004;
app.use(express_1.default.json());
// Rota principal para a busca e filtro
app.get('/countries', async (req, res) => {
    try {
        // 1. Obtém todos os países da API externa
        const allCountries = await (0, api_1.fetchAllCountries)();
        const countryService = new countryService_1.CountryService(allCountries);
        // 2. Extrai os parâmetros de busca e filtro da URL
        const { name, region } = req.query;
        let filteredCountries = allCountries;
        // 3. Aplica os filtros, se existirem
        if (name && typeof name === 'string') {
            filteredCountries = countryService.searchByName(name);
        }
        if (region && typeof region === 'string') {
            if (!Object.values(types_1.CountryRegion).includes(region)) {
                return res.status(400).send({ error: `Região inválida. Regiões válidas são: ${Object.values(types_1.CountryRegion).join(', ')}` });
            }
            filteredCountries = countryService.filterByRegion(region);
        }
        // 4. Retorna a lista de países filtrada
        return res.status(200).json(filteredCountries);
    }
    catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return res.status(500).send({ error: 'Erro interno do servidor.' });
    }
});
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map