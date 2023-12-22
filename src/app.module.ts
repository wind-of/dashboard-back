import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { ProjectModule } from "src/project/project.module";
import { TaskModule } from "src/task/task.module";
import { RolesModule } from "src/roles/roles.module";
import { CommentModule } from "src/comment/comment.module";
import { ColumnsModule } from "src/columns/columns.module";
import typeorm from "src/config/typeorm";
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
		ProjectModule,
		TaskModule,
		RolesModule,
		CommentModule,
		ColumnsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
