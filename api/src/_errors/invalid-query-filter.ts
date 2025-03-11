export class InvalidQueryError extends Error {

    constructor(message?: string) {
        super(message ?? 'Consulta Inválida, verifique os filtros e tente novamente');
    }

}