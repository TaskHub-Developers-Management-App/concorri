import fastify from "fastify";
import { env } from "./env";

const app = fastify();

app.get('/hello', () => {
    console.log('Hello World')
})

app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP Server Running!')
})