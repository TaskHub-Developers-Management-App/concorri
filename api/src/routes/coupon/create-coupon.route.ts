import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createCouponUsecase } from "../../usecases/coupon/create-coupon.usecase";

export async function CreateCouponRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/coupons',
            {
                schema: {
                    body: z.object({
                        customerName: z.string().trim().min(6),
                        customerPhone: z.string(),
                        customerAddress: z.string(),
                        customerCPF: z.string(),
                        purchasePrice: z.coerce.number().min(0).default(0),
                        lotteryId: z.string().uuid()
                    })
                },
            },
            async (request, reply) => {
                request.jwtVerify();

                const {
                    customerName,
                    customerPhone,
                    customerCPF,
                    customerAddress,
                    purchasePrice,
                    lotteryId
                } = request.body;

                const data = await createCouponUsecase({
                    customerName,
                    customerPhone,
                    customerAddress,
                    customerCPF,
                    purchasePrice,
                    lotteryId
                })

                return reply.status(201).send(data);
            }
        )
}
