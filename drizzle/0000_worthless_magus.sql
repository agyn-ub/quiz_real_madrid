CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegram_id" integer NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"username" text,
	"language_code" text,
	"photo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id")
);
