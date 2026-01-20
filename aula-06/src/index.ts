import express, { Request, Response } from 'express';
// import {isCNH, isCNPJ, isCPF} from 'validation-br';
import validation from 'validation-br';
import cep from 'cep-promise';
import zod, { z } from 'zod';

const app = express();
const port = 3004;


interface IPessoa {
    cpf:string;
    nome: string;
    rg: number;
}

interface IEndereco {
    cep: number;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

interface ICliente extends IPessoa, IEndereco {
    email: string;
}

let clientes: ICliente[] = [
    {
        cpf: "12345678901",
        nome: "João Silva",
        rg: 123456789,
        cep: 84033106,
        logradouro: "Rua A",
        bairro: "PQ Pinheiros",
        localidade: "Ponta Grossa",
        uf: "PR",
        email: "joao.silva@example.com"
    },
    {
        cpf: "98765432100",
        nome: "Maria Oliveira",
        rg: 987654321,
        cep: 84033107,
        logradouro: "Rua B",
        bairro: "PQ Pinheiros",
        localidade: "Ponta Grossa",
        uf: "PR",
        email: "maria.oliveira@example.com"
    },
    {
        cpf: "12312312312",
        nome: "Carlos Souza",
        rg: 123123123,
        cep: 84033108,
        logradouro: "Rua C",
        bairro: "PQ Pinheiros",
        localidade: "Ponta Grossa",
        uf: "PR",
        email: "carlos.souza@example.com"
    }
];

const ClienteSchema = z.object({
  cpf: z.string().min(11, "CPF deve ter no mínimo 11 caracteres."),
  nome: z.string().min(1, "Nome é obrigatório."),
  rg: z.number().int("RG deve ser um número inteiro."),
  cep: z.number().int("CEP deve ser um número inteiro."),
  logradouro: z.string().min(1, "Logradouro é obrigatório."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  localidade: z.string().min(1, "Localidade é obrigatória."),
  uf: z.string().length(2, "UF deve ter 2 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
});

app.get("/", (req: Request, res: Response) => {
  res.send("API de validação de CPF, CNPJ e CEP");
});

// app.get("/valida-cpf/:cpf", async (req: Request<{ cpf : String}>, res: Response) => {git 
//   const cpfValue = await validation.isCPF(req.params.cpf);

//   if (cpfValue) {
//     res.send("CPF válido!");
//   } else {
//     res.status(400).json({ error: "CPF inválido!" });
//   }
// });

app.get("/valida-cpf/:cpf", async (req: Request, res: Response) => {
  const { cpf } : any = req.params;
  const cpfValue = validation.isCPF(cpf);

  if (cpfValue) {
      res.send("CPF válido!");
  } else {
      res.status(400).json({ error: "CPF inválido!" });
  }
});

// app.get("/valida-cnpj/:cnpj", async (req: Request, res: Response) => {
//   const cnpjValue = await validation.isCNPJ (req.params.cnpj);

//   if (cnpjValue) {
//     res.send("CNPJ válido!");
//   } else {
//     res.status(400).json({ error: "CNPJ inválido!" });
//   }
// });

app.get("/valida-cnpj/:cnpj", async (req: Request, res: Response) => {
  const { cnpj } : any = req.params;
  const cnpjValue = validation.isCNPJ(cnpj);

  if (cnpjValue) {
      res.send("CNPJ válido!");
  } else {
      res.status(400).json({ error: "CNPJ inválido!" });
  }
});

// app.get("/valida-cnh/:cnh", async (req: Request, res: Response) => {
//     const cnhValue = await validation.isCNH(req.params.cnh);

//     if (cnhValue) {
//         res.send("CNH válida!");
//     } else {
//         res.status(400).json({ error: "CNH inválida!" });
//     }
// });

app.get("/valida-cnh/:cnh", async (req: Request, res: Response) => {
  const { cnh } : any = req.params;
  const cnhValue = validation.isCNH(cnh);

  if (cnhValue) {
      res.send("CNH válida!");
  } else {
      res.status(400).json({ error: "CNH inválida!" });
  }
});

// app.get("/valida-cep/:cep", async (req: Request, res: Response) => {
//   const cepValue = await cep(req.params.cep);

//   if (cepValue) {
//     res.send("CEP valido!");
//   } else {
//     res.status(400).json({ error: "Erro ao buscar CEP" });
//   }
// });

app.get("/valida-cep/:cep", async (req: Request, res: Response) => {
  const cepValue : any = req.params.cep; 
  const cepResponse = await cep(cepValue);   

  if (cepResponse) {
    res.send("CEP valido!");
  } else {
    res.status(400).json({ error: "Erro ao buscar CEP" });
  }
});

app.get("/clientes", (req: Request, res: Response) => {
  res.json(clientes);
});

app.get("/clientes/:cpf", (req: Request, res: Response) => {
  const cliente = clientes.find(IClientes => IClientes.cpf === String(req.params.cpf));
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ error: "Cliente não encontrado" });
  }
});

app.post("/clientes", express.json(), (req: Request, res: Response) => {
  // Tenta validar o corpo da requisição usando o ClienteSchema
  const result: any = ClienteSchema.safeParse(req.body);

  // Se a validação falhou...
  if (!result.success) {
      // Extrai os erros do resultado e envia uma resposta com status 400 (Bad Request)
      return res.status(400).json({ error: result.error.errors });
  }

  // Se a validação foi bem-sucedida, você pode usar os dados validados
  const novoCliente: ICliente = result.data;
  
  // Agora você pode adicionar o cliente ao array
  clientes.push(novoCliente);
  
  // E retorna a resposta de sucesso
  res.status(201).json(novoCliente);
});

app.delete("/clientes/:cpf", (req: Request, res: Response) => {
  const { cpf } = req.params;
  clientes = clientes.filter(cliente => cliente.cpf !== String(cpf));
  res.status(204).send();
});

app.put("/clientes/:cpf", express.json(), (req: Request, res: Response) => {
  const { cpf } = req.params;
  const clienteIndex = clientes.findIndex(cliente => cliente.cpf === String(cpf));

  if (clienteIndex === -1) {
      return res.status(404).json({ error: "Cliente não encontrado" });
  }

  // Tenta validar o corpo da requisição
  const result: any = ClienteSchema.safeParse(req.body);

  // Se a validação falhou...
  if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
  }

  // Se a validação foi bem-sucedida, você pode usar os dados validados
  const dadosAtualizados: ICliente = result.data;

  // Atualiza o cliente
  clientes[clienteIndex] = { ...clientes[clienteIndex], ...dadosAtualizados };
  
  // Retorna o cliente atualizado
  res.json(clientes[clienteIndex]);
});

clientes.push({
        cpf: "09632146913",
        nome: "Johnatan",
        rg: 987654321,
        cep: 84033107,
        logradouro: "Rua T",
        bairro: "PQ Pinheiros",
        localidade: "Ponta Grossa",
        uf: "PR",
        email: "johnatan@example.com"
    }
);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});