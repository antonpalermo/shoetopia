import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

const main = async () => {
  const app = express()
  const port = process.env.PORT || 4000

  app.get('/', (_, res) => {
    res.status(200).send({ message: 'OK' })
  })

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
}

main().catch((err) => console.log('Internal Server Error: ', err))
