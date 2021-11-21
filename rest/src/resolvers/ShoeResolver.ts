import { Resolver, Query, Arg } from 'type-graphql'

@Resolver()
class ShoeResolver {
  @Query(() => String)
  test(@Arg('message') msg: string) {
    return msg
  }
}

export default ShoeResolver
