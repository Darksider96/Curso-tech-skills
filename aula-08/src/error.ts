export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // Garante que o nome da classe seja AppError em caso de rastreamento de pilha
        this.name = this.constructor.name;
        // Captura o rastreamento de pilha completo
        Error.captureStackTrace(this, this.constructor);
    }
}

