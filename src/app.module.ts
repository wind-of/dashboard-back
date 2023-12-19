import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();
@Module({
	imports: [
		AuthModule,
		UsersModule,
		JwtModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.HOST_NAME,
			port: Number(process.env.PORT_NUMBER),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: []
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
