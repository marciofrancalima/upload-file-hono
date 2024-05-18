require("dotenv/config");

const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const { resolve } = require("path");
const postgres = require("postgres");

const driver = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const client = drizzle(driver);
const migrations = resolve(__dirname, "drizzle");

migrate(client, {
  migrationsFolder: migrations,
})
  .then(() => console.log("Migrations ran successfully!"))
  .catch((err) => console.error(err))
  .finally(() => driver.end());
