import React from 'react'
import { gql, useQuery } from '@apollo/client'

const Home: React.FunctionComponent = () => {
  const GETSHOES_QUERY = gql`
    query Query {
      shoes {
        id
        name
        description
        size
        price
        datePosted
        dateCreated
        dateUpdated
      }
    }
  `

  const { data, loading } = useQuery(GETSHOES_QUERY)

  if (loading) return <p>{'Loading....'}</p>

  return (
    <>
      <h1>Shoetopia</h1>
      {/* {data.shoes.map((shoe: any, i: number) => (
        <div key={i}>
          <h1>{shoe.name}</h1>
        </div>
      ))} */}
      <p>This site currently under maintenance...</p>
    </>
  )
}

export default Home
