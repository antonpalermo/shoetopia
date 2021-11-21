import express from 'express'

const main = async () => {
  const app = express()
  const port = process.env.PORT || 4000

  app.get('/', (_, res) => {
    res.status(200).send({ message: 'OK' })
  })

  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  )
}

main().catch((err) => console.log('Internal Server Error: ', err))
