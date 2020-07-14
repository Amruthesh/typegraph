import { Resolver, Query, Arg, Ctx, UseMiddleware } from "type-graphql"
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'
import { StandardContext } from "../types/StandardContext"
import { logArgs } from "../../middlewares/logArgs"

@Resolver()
export default class LoginResolver {
    @UseMiddleware(logArgs)
    @Query(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: StandardContext
    ): Promise<User | null> {
        console.log(email)
        const user = await User.findOne({ where: { email }})
        if (!user) {
            console.log("User not defined")
            return null
        }
        const valid = await bcrypt.compare(password, user.password)
        console.log(valid)
        if (!valid) {
            console.log("Password does not match")
            return null
        }
        ctx.req.session!.userId = user.id

        return user
    }
}