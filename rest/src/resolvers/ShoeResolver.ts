import {
  Resolver,
  Query,
  Arg,
  ObjectType,
  Field,
  Mutation,
  InputType,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import ErrorSchema from '../schema/ErrorSchema'
import ShoeSchema from '../schema/ShoeSchema'

import Shoe from '../entity/Shoe'

@ObjectType()
class QueryResponse {
  @Field(() => [ErrorSchema], { nullable: true })
  errors?: ErrorSchema[]

  @Field(() => [ShoeSchema], { nullable: true })
  data?: ShoeSchema[]
}

@InputType()
class ShoeInput {
  @Field()
  name?: string

  @Field()
  description?: string

  @Field()
  size?: number

  @Field()
  price?: number
}

@Resolver(ShoeSchema)
class ShoeResolver {
  @Query(() => QueryResponse)
  async getShoes(): Promise<QueryResponse> {
    const result = await getConnection().getRepository(Shoe).find()
    if (!result) {
      return {
        errors: [
          {
            type: 'Empty Query',
            message: 'Unable to fetch all data',
          },
        ],
      }
    }
    return {
      data: result,
    }
  }

  @Query(() => QueryResponse)
  async getShoe(@Arg('id') id: string): Promise<QueryResponse> {
    const result = await getConnection().getRepository(Shoe).findOne(id)
    if (!result) {
      return {
        errors: [
          {
            type: 'Empty Query',
            message: id + 'not found',
          },
        ],
      }
    }
    return {
      data: [{ ...result }],
    }
  }

  @Mutation(() => QueryResponse)
  async addShoe(@Arg('shoe') shoe: ShoeInput): Promise<QueryResponse> {
    const result = await getConnection()
      .getRepository(Shoe)
      .createQueryBuilder()
      .insert()
      .into(Shoe)
      .values({ ...shoe })
      .returning('*')
      .execute()

    if (!result) {
      return {
        errors: [
          {
            type: 'Error insert',
            message: 'Unable to insert ' + shoe.name,
          },
        ],
      }
    }

    return {
      data: [{ ...result.raw[0] }],
    }
  }
}

export default ShoeResolver
