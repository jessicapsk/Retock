import { DataSource } from "typeorm";
import { User } from "../models/User";
import dotenv from "dotenv";
import * as path from "path";

// Correção do caminho para o arquivo .env
const envPath = path.resolve(__dirname, "../../../../.env");
console.log("Tentando carregar .env de:", envPath);
dotenv.config({ path: envPath });

// Verificação se as variáveis foram carregadas
console.log("Variáveis de ambiente carregadas:", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  // Não exibir senha em logs
});

// Captura as variáveis do ambiente
const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME, 
  DB_PASSWORD,
  DB_DATABASE
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "db",
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "supersecret",
  database: DB_DATABASE || "retock",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});