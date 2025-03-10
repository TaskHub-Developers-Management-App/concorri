import fastify from "fastify";
import { env } from "./env";
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";

import { SignUpUserRoute } from "./routes/auth/signup-user.route";
import { LoginUserRoute } from "./routes/auth/login-user.route";
import { CreateStoreRoute } from "./routes/store/create-store.route";
import { CreateCouponRoute } from "./routes/coupon/create-coupon.route";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Auth Routes
app.register(SignUpUserRoute);
app.register(LoginUserRoute);

// Store Routes
app.register(CreateStoreRoute);

// Coupon Routes
app.register(CreateCouponRoute);

// ...

app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP Server Running!')
})