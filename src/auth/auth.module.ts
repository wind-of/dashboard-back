import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { SessionSerializer } from "./session.serializer";
import { AuthController } from "./auth.controller";

@Module({
	imports: [
		UsersModule,
		PassportModule.register({ session: true }),
		JwtModule.register({})
	],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
