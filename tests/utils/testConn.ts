import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        name: "default",
        host: "localhost",
        port: 5432,
        username: "",
        password: "",
        database: "series_test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../../src/entity/*.ts"]
    })
}