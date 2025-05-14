import fastify from "fastify";
import { env } from "./env";
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";

import { SignUpUserRoute } from "./routes/auth/signup-user.route";
import { GetUserProfileRoute } from "./routes/auth/get-user-profile.route";
import { LoginUserRoute } from "./routes/auth/login-user.route";
import { CreateStoreRoute } from "./routes/store/create-store.route";
import { CreateCouponRoute } from "./routes/coupon/create-coupon.route";
import { FindAllStoresRoute } from "./routes/store/find-all-stores.route";
import { CreateLotteryRoute } from "./routes/lottery/create-lottery.route";
import { FindAllLotteriesByStoreIdRoute } from "./routes/lottery/find-all-lotteries-by-store-id.route";
import { FindAllCouponsByLotteryIdRoute } from "./routes/coupon/find-all-coupons-by-lottery-id.route";
import { errorHandler } from "./error-handler";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
// app.setErrorHandler(errorHandler);

// Auth Routes
app.register(SignUpUserRoute);
app.register(LoginUserRoute);
app.register(GetUserProfileRoute);

// Lottery Routes
app.register(CreateLotteryRoute);
app.register(FindAllLotteriesByStoreIdRoute);

// Store Routes
app.register(CreateStoreRoute);
app.register(FindAllStoresRoute);

// Coupon Routes
app.register(CreateCouponRoute);
app.register(FindAllCouponsByLotteryIdRoute)

app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP Server Running!')
});