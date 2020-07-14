import { MiddlewareFn } from "type-graphql"
import { StandardContext } from "src/modules/types/StandardContext"

export const logArgs: MiddlewareFn<StandardContext> = async ({ args }, next) => {
    console.log("Args: ", args)

    return next()
}