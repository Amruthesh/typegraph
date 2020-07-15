import { testConn } from "../../../utils/testConn"
import { Connection } from "typeorm"
import { gCall } from "../../gCall";
import { User } from "../../../../src/entity/User"

import * as faker from "faker"

let conn: Connection

beforeAll(async () => {
    conn = await testConn()
})

afterAll(async () => {
    conn.close()
})
const registerMutation = `
mutation Register($data: RegisterInput!) {
    register(
      data: $data
    ){
        email
        firstName
        lastName
        name
    }
}
`

describe("Register", () => {
    it("create user", async () => {
        const userData = {
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password()
        }
        const variableValues = {data: userData}
        const response = await gCall({
            source: registerMutation,
            variableValues
        })
        expect(response).toMatchObject({
            data: {
                register: {
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    name: `${userData.firstName} ${userData.lastName}`
                }
            }
        })
        const userInDb = User.findOne({ where: { email: userData.email }})
        expect(userInDb).toBeDefined()
    })
})