"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCountries = void 0;
// src/utils/api.ts
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'https://restcountries.com/v3.1';
const fetchAllCountries = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/all?fields=name,region,capital,population,flags`);
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error(`Erro ao buscar países: ${error.message}`);
            throw new Error('Falha ao conectar à API de países.'); // Adicione esta linha
        }
        else {
            console.error(`Erro inesperado: ${error}`);
            throw new Error('Ocorreu um erro inesperado.'); // Adicione esta linha
        }
    }
};
exports.fetchAllCountries = fetchAllCountries;
//# sourceMappingURL=api.js.map