import express from 'express';
import { fetchAllCountries } from './utils/api';
import { CountryService } from './services/countryService';
import { CountryRegion, ICountry } from './types';
import cors from 'cors';
import open from 'open'; // Adicione esta linha

const app = express();
const PORT = 3004;

app.use(express.json());
app.use(cors());


app.get('/countries', async (req, res) => {
  try {
    // 1. Obtém todos os países da API externa
    const allCountries: ICountry []= await fetchAllCountries();
    const countryService: CountryService= new CountryService(allCountries);

    // 2. Extrai os parâmetros de busca e filtro da URL
    const { name, region } = req.query;

    let filteredCountries = allCountries;

    // 3. Aplica os filtros, se existirem
    if (name && typeof name === 'string') {
      filteredCountries = countryService.searchByName(name);
    }

    if (region && typeof region === 'string') {
      if (!Object.values(CountryRegion).includes(region as CountryRegion)) {
        return res.status(400).send({ error: `Região inválida. Regiões válidas são: ${Object.values(CountryRegion).join(', ')}` });
      }
      filteredCountries = countryService.filterByRegion(region as CountryRegion);
    }

    // 4. Retorna a lista de países filtrada
    return res.status(200).json(filteredCountries);

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).send({ error: 'Erro interno do servidor.' });
  }
});

// Inicia o servidor e abre o navegador
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  open(`src/index.html`); // Adicione esta linha
});