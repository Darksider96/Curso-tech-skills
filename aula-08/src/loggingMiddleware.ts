// loggingMiddleware.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de logging para exibir informações de cada requisição.
 * @param req O objeto de requisição do Express.
 * @param res O objeto de resposta do Express.
 * @param next A função para passar o controle para o próximo middleware.
 */
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Método: ${req.method} | URL: ${req.originalUrl}`);
    next(); // Permite que a requisição continue para a próxima rota ou middleware
};