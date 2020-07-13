import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column("text", { unique: true })
    email: string

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Column({default: true})
    isActive: boolean

    @Column()
    password: string
}