import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import Shoe from './entity/Shoe'

createConnection()
  .then(async (conn) => {
    const app = express()
    const port = process.env.PORT || 4000

    app.get('/', (_, res) => {
      res.status(200).send({ message: 'OK' })
    })

    const result = await conn
      .getRepository(Shoe)
      .createQueryBuilder('shoe')
      .insert()
      .into(Shoe)
      .values({
        name: 'Adidas',
        description: 'the addidas shoe',
        size: 32.0,
        price: 5000.0,
      })
      .returning('*')
      .execute()

    console.log(result.raw[0])

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [`${__dirname}/resolvers/**/*.ts`],
        validate: false,
      }),
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    app.listen(port, () =>
      console.log(`Server listening on http://localhost:${port}`)
    )
  })
  .catch((err) => console.log('Internal Server Error: ', err))
