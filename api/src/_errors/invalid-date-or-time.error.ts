export class InvalidDateOrTimeError extends Error {
    constructor(message?: string) {
        super(message ?? 'A data e hora do sorteio não podem ser anteriores à data e hora atual, verifique o drawDate e o drawTime');
    }
}