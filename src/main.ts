import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
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
			secret: process.env.SESSION_SECRET || "keyboard cat",
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: 60000000 }
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.enableCors({ origin: process.env.BASE_URL, credentials: true });
	await app.listen(3000);
}
bootstrap();
