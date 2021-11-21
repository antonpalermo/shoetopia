import { Resolver, Query, Arg, Field, Mutation, InputType } from 'type-graphql'
import { getConnection, getRepository } from 'typeorm'

import Shoe from '../entity/Shoe'
import ShoeSchema from '../schema/ShoeSchema'

@InputType()
class DataFields {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  size?: number

  @Field({ nullable: true })
  price?: number
}

@Resolver(ShoeSchema)
class ShoeResolver {
  @Query(() => [ShoeSchema])
  async shoes(): Promise<ShoeSchema[]> {
    return await getRepository(Shoe).createQueryBuilder('shoe').getMany()
  }

  @Query(() => ShoeSchema, { nullable: true })
  async shoe(@Arg('id') id: string): Promise<ShoeSchema> {
    return await getRepository(Shoe)
      .createQueryBuilder('shoe')
      .where('id=:id', { id })
      .getOne()
  }

  @Mutation(() => ShoeSchema)
  async create(@Arg('shoe') shoe: DataFields): Promise<ShoeSchema> {
    return await (
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Shoe)
        .values({ ...shoe })
        .returning('*')
        .execute()
    ).raw[0]
  }

  @Mutation(() => ShoeSchema)
  async update(
    @Arg('id') id: string,
    @Arg('shoe') shoe: DataFields
  ): Promise<ShoeSchema> {
    return await (
      await getRepository(Shoe)
        .createQueryBuilder()
        .update()
        .set({ ...shoe })
        .where('id=:id', { id })
        .returning('*')
        .execute()
    ).raw[0]
  }

  @Mutation(() => ShoeSchema)
  async delete(@Arg('id') id: string): Promise<ShoeSchema> {
    return await (
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Shoe)
        .where('id = :id', { id })
        .returning('*')
        .execute()
    ).raw[0]
  }
}

export default ShoeResolver
