export class InvalidLotteryDrawDate extends Error {
    constructor(message?: string) {
        super(message ?? 'A data do sorteio não podem ser anteriores à data e hora atual');
    }
}