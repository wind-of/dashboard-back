import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { LocalStrategy } from "src/auth/local.strategy";
import { SessionSerializer } from "src/auth/session.serializer";
import { AuthController } from "src/auth/auth.controller";
import { UsersModule } from "src/users/users.module";

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
