import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Note } from "./src/notes/note.entity";

dotenv.config(); 

const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [Note],
    synchronize: false,
    migrations: ["src/migrations/*.ts"],
});

export default AppDataSource;