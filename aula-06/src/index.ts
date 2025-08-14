import express from 'express';
import {isCNH, isCNPJ, isCPF} from 'validation-br';
import validate from 'validation-br';
import cep from 'cep-promise';

const app = express();
const port = 3002
app.use(express.json());

interface IPessoa {
    CPF: string;
    nome: string;
    RG: string;
};

interface IEndereco {
    CEP: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
};

interface ICliente extends IPessoa, IEndereco { 
    telefone: string;
    email: string;
};

let clientes: ICliente[] = [
    {
    CPF: '12345678909',
    nome: 'João da Silva',
    RG: '123456789',
    CEP: '12345-678',
    rua: 'Rua Exemplo',
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    estado: 'SP',
    telefone: '11987654321',
    email: 'joao@exemple.com'
    },
    {
    CPF: '98765432100',
    nome: 'Maria Oliveira',
    RG: '987654321',
    CEP: '87654-321',
    rua: 'Avenida Exemplo',     
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    estado: 'RJ',
    telefone: '21987654321',
    email: 'maria@example.com'
    }]

interface cnpj {
    cnpj: string;
};

interface cnh {
    cnh: string;
};

interface cepverify {
    cep: string;
};
 

app.get('/valida-cpf/:cpf', (req, res) => {
    const { cpf } = req.params;
    if (validate.isCPF(cpf)) {
        return res.send('CPF Valido');
    }else {
        return res.status(400).json({ error: 'CPF inválido' });
    }

});


app.get('/valida-cnpj/:cnpj', (req, res) => {
    const { cnpj } = req.params;
    if (validate.isCNPJ(cnpj)) {
        return res.send('CNPF Valido');
    }else {
        return res.status(400).json({ error: 'CNPF inválido' });
    }

});

app.get('/valida-cnh/:cnh', (req, res) => {
    const { cnh } = req.params;
    if (validate.isCNH(cnh)) {
        return res.send('CNH Valido');
    }else {
        return res.status(400).json({ error: 'CNH inválido' });
    }

});

app.get('/valida-cep/:cep', async (req, res) => {
    // 1. Extraia o parâmetro 'cep' corretamente da URL
    const cepverify = req.params.cep;

    try {
        // 2. Chame a função 'cep' sem o ponto na frente e use 'await'
        await cep(cepverify);
        return res.send('CEP Válido');
    } catch (error) {
        // Se a função 'cep' falhar, significa que o CEP é inválido
        return res.status(400).json({ error: 'CEP inválido' });
    }
});


app.get('/clientes', (req, res) => {
    return res.json(clientes);
});

app.get('/clientes/:cpf', (req, res) => {
    const { cpf } = req.params;
    const cliente = clientes.find(c => c.CPF === cpf);
    if (cliente) {
        return res.json(cliente);
    }
    return res.status(404).json({ error: 'Cliente não encontrado' });
});

app.post('/clientes', (req, res) => {
    const { CPF, nome, RG, CEP, rua, bairro, cidade, estado, telefone, email } = req.body;

    if (!validate.isCPF(CPF)) {
        return res.status(400).json({ error: 'CPF inválido' });
    }

    const novoCliente: ICliente = {
        CPF,
        nome,
        RG,
        CEP,
        rua,
        bairro,
        cidade,
        estado,
        telefone,
        email
    };

    clientes.push(novoCliente);
    return res.status(201).json(novoCliente);
});

app.delete('/clientes/:cpf', (req, res) => {
    let deleteUser = (req.params.cpf);
    let dadosdel = clientes.length;
    clientes = clientes.filter(ICliente => ICliente.CPF !== deleteUser);

    if (clientes.length < dadosdel){
        res.status(200).send(`Usuario ${deleteUser} deletado!`);
      } else {
        res.status(404).send(`Uuario ${deleteUser} não encontrado!.`);
      }

})

app.put('/clientes/:cpf', (req, res) => {
    const { cpf } = req.params;
    const { nome, RG, CEP, rua, bairro, cidade, estado, telefone, email } = req.body;

    const clienteIndex = clientes.findIndex(c => c.CPF === cpf);
    if (clienteIndex === -1) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (!validate.isCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido' });
    }

    const clienteAtualizado: ICliente = {
        CPF: cpf,
        nome,
        RG,
        CEP,
        rua,
        bairro,
        cidade,
        estado,
        telefone,
        email
    };

    clientes[clienteIndex] = clienteAtualizado;
    return res.json(clienteAtualizado);
});






app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
});
