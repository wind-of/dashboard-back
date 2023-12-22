import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProjectModule } from "./project/project.module";
import typeorm from "./config/typeorm";
import * as dotenv from "dotenv";

dotenv.config();
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [typeorm]
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) =>
				configService.get("typeorm")
		}),
		AuthModule,
		UsersModule,
		JwtModule,
		ProjectModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
