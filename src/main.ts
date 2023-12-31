import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet());
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
	app.enableCors({ origin: process.env.BASE_URL, credentials: true });
	await app.listen(3000);
}
bootstrap();
