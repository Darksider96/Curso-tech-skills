// src/server.ts

import express, { Request, Response, NextFunction } from 'express';
import { AppError } from './error';
import { errorHandler } from './errorMiddleware';
import { UserRepository } from './userRepository';
import { IUser } from './types'; // Adicione a interface IUser ao seu arquivo de tipos

const app = express();
const port: number = 3004;

// Instancia a camada de repositório
const userRepository = new UserRepository();

// Middlewares
app.use(express.json());

// Rotas da API

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(new AppError('Erro ao buscar usuários', 500));
    }
});

app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    // Verificação de segurança: checa se o ID existe
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('ID do usuário não fornecido.', 400));
    }

    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            return next(new AppError(`Usuário com ID ${userId} não encontrado.`, 404));
        }
        res.status(200).json(user);
    } catch (err) {
        next(new AppError('Erro ao buscar usuário.', 500));
    }
});

app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = req.body;
        if (!user || !user.id || !user.name || !user.email) {
            return next(new AppError("Dados do usuário inválidos.", 400));
        }
        const newUser = await userRepository.create(user);
        res.status(201).json(newUser);
    } catch (err) {
        next(new AppError('Erro ao criar usuário', 500));
    }
});

app.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    // Verificação de segurança: checa se o ID existe
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('ID do usuário não fornecido.', 400));
    }

    try {
        const updatedUser = await userRepository.update(userId, req.body);
        if (!updatedUser) {
            return next(new AppError(`Usuário com ID ${userId} não encontrado para atualização.`, 404));
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(new AppError('Erro ao atualizar usuário.', 500));
    }
});

app.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    // Verificação de segurança: checa se o ID existe
    const userId = req.params.id;
    if (!userId) {
        return next(new AppError('ID do usuário não fornecido.', 400));
    }

    try {
        const numRemoved = await userRepository.delete(userId);
        if (numRemoved === 0) {
            return next(new AppError(`Usuário com ID ${userId} não encontrado.`, 404));
        }
        res.status(200).send(`Usuário ${userId} deletado com sucesso.`);
    } catch (err) {
        next(new AppError('Erro ao deletar usuário.', 500));
    }
});
// Middleware global de tratamento de erros DEVE ser o último
app.use(errorHandler);

app.listen(port, () => {
    console.log("Api iniciada na porta: " + port);
});