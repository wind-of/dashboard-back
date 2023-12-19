import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.use(
		session({
			secret: "keyboard",
			resave: false,
			saveUninitialized: false
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.enableCors({ origin: "*" });
	await app.listen(3000);
}
bootstrap();
