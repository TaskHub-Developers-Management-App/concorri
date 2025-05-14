export class UnauthorizedUserRequestForCoupons extends Error {

    constructor(message?: string) {
        super(message ?? 'Consulta Inválida, você só pode consultar cupons de um sorteio que pertence a sua loja');
    }

}