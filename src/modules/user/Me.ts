import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { StandardContext } from "../types/StandardContext";

@Resolver()
export default class MeResolver {
    @Query(() => User, {nullable: true})
    async me(
        @Ctx() ctx: StandardContext
    ): Promise< User | undefined > {
        const userId = ctx.req.session!.userId
        console.log(userId)
        
        if (!userId){
            return undefined
        }
        return await User.findOne({ where: { id: userId }})
    }
}