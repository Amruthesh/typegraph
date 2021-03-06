import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailInUse } from "./emailInUseValidator";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    firstName: string

    @Field()
    @Length(1, 255)
    lastName: string

    @Field()
    @IsEmail()
    @IsEmailInUse({ message: "Email is already in use" })
    email: string

    @Field()
    password: string
}