import {Resolver, Mutation, Ctx} from "type-graphql"
import { StandardContext } from "../types/StandardContext";

@Resolver()
export default class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: StandardContext
    ): Promise< Boolean > {
        return new Promise((res, rej) => {
            ctx.req.session!.destroy((err) => {
                if (err) {
                    console.log("Error: ", err)
                    rej(false)
                }
                res(true)
            })
        })
    }
}