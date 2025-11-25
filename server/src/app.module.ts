import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotesModule } from "./notes/notes.module";
import { Note } from "./notes/note.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DB_URL,
      entities: [Note],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}