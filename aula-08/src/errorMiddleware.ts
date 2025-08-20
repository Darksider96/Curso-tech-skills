import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from './error';

/**
 * Middleware global de tratamento de erros.
 * Captura AppErrors e outros erros, enviando uma resposta padronizada.
 */
export const errorHandler: ErrorRequestHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Erro interno do servidor.';

    // Se o erro for uma instância de AppError, use suas propriedades
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        // Log do erro para depuração em produção, mas não exiba detalhes para o cliente
        console.error(err);
    }

    // Envia uma resposta padronizada
    res.status(statusCode).json({
        error: message,
    });
};