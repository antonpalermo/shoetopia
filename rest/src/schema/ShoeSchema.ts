import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class ShoeSchema {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  size: number

  @Field()
  price: number

  @Field()
  datePosted: Date

  @Field()
  dateCreated: Date

  @Field()
  dateUpdated: Date
}

export default ShoeSchema
