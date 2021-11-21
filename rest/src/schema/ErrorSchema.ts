import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class ErrorSchema {
  @Field()
  type: string

  @Field()
  message: string
}

export default ErrorSchema
