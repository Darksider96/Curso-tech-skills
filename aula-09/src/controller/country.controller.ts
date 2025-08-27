import { Response, Request } from "express";
import Axios from "axios";
import { ICountry } from "../interface/country.interface";
import axios from "axios";

const API_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async (req: Request, res: Response) => {
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/all`);
    res.json(response.data);
    } catch (error) {
        if (Axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).json({message: "Erro ao buscar lista de paises!"});
        } else {
            res.status(500).json({message: "Ocorreu um erro inesperado!"});
        }
    }
};
    
export const getCountryByName = async (req: Request, res: Response) => {
    const { name } : any = req.params;
        try {
            const response = await Axios.get<ICountry[]>(`${API_URL}/name/${name}`);
            res.json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                        return res.status(404).json({message: "Pais não encontrado!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar pais!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }

        }
};


export const getCountryByCapital = async (req: Request, res: Response) => {
    const { capital } : any = req.params;
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/capital/${capital}`);
        res.json(response.data);
    } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Capital não encontrada!"});
                } 
                    res.status(error.response?.status || 500).json({message: "Erro ao buscar capital!"})
                } else {
                    res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
    }
};

export const getCountryByRegion = async (req: Request, res: Response) => {
    const { region } : any = req.params;
        try {
            const response = await Axios.get<ICountry[]>(`${API_URL}/capital/${region}`);
            res.json(response.data);
        }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Capital não encontrada!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar capital!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
    };

export const getCountryByPopulation = async (req: Request, res: Response) => {
    const { population } : any = req.params;
        try{
        const response = await Axios.get<ICountry[]>(`${API_URL}/População/${population}`);
        res.json(response.data);
        }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Dado para população não encontrada!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar dado de população!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryByCurrency = async (req: Request, res: Response) => {
    const { moeda } : any = req.params;
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/Moeda/${moeda}`);
        res.json(response.data);
    }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Dado para moeda não encontrada!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar dado da moeda!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryByLanguage = async (req: Request, res: Response) => {
    const { language } : any = req.params;
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/linguagem/${language}`);
        res.json(response.data);
    }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Dado para população não encontrada!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar dado de população!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryByBorder = async (req: Request, res: Response) => {
    const { border } : any = req
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/Fronteira/${border}`);
        res.json(response.data);
    }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Dado para fronteira não encontrada!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar dado de fronteira!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryByCode = async (req: Request, res: Response) => {
    const { code } : any = req
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/Código/${code}`);
        res.json(response.data);
    }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Código não encontrado!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar código!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryByCallingCode = async (req: Request, res: Response) => {
    const { callingCode } : any = req
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/Chamada/${callingCode}`);
        res.json(response.data);
        }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Código de area não encontrada!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar código de area"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryBySubregion = async (req: Request, res: Response) => {
    const { subregion } : any = req
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/Sub-Região/${subregion}`);
        res.json(response.data);
        }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Dado para sub-região não encontrado!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar dado de sub-região!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};

export const getCountryByFilter = async (req: Request, res: Response) => {
    const { filter } : any = req    
    try {
        const response = await Axios.get<ICountry[]>(`${API_URL}/Filtro/${filter}`);
        res.json(response.data);
    } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404){
                    return res.status(404) .json({message: "Filtro não encontrado!"});
                } 
                res.status(error.response?.status || 500).json({message: "Erro ao buscar filtro!"})
            } else {
                res.status(500).json({message: "Ocorreu um erro inesperado!"});
            }
        }
};





