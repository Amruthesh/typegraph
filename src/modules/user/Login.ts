import { Resolver, Query, Arg, Ctx } from "type-graphql"
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'
import { StandardContext } from "../types/StandardContext"

@Resolver()
export default class LoginResolver {
    
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
        const valid = bcrypt.compare(password, user.password)
        if (!valid) {
            console.log("Password does not match")
            return null
        }
        ctx.req.session!.userId = user.id

        return user
    }
}