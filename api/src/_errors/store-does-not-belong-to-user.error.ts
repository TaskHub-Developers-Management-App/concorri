export class StoreDoesNotBelongToUserError extends Error {

    constructor(message?: string) {
        super(message ?? 'Só se pode criar sorteios para lojas nas quais você é dono');
    }

}