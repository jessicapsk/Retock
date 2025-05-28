import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";
import { User } from "./models/User";
import authRoutes from './routes/authRoutes';

// Configuração de ambiente
dotenv.config();

// Inicializa Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste para verificar a conexão
app.get("/api/test", (req: express.Request, res: express.Response) => {
  return res.json({ message: "API está funcionando!" });
});

// Rota de teste para verificar a conexão com o banco de dados
app.get("/api/db-test", async (req: express.Request, res: express.Response) => {
  try {
    const testQuery = await AppDataSource.query("SELECT NOW()");
    return res.json({ 
      message: "Conexão com banco de dados OK!",
      timestamp: testQuery[0].now
    });
  } catch (error: any) {
    console.error("Erro na conexão com o banco:", error);
    return res.status(500).json({ 
      message: "Erro na conexão com o banco de dados",
      error: error.message
    });
  }
});

// Rota para listar usuários
app.get("/api/users", async (req: express.Request, res: express.Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return res.json(users);
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ 
      message: "Erro ao buscar usuários",
      error: error.message 
    });
  }
});

// Rota para criar um usuário de teste
app.post("/api/users/test", async (req: express.Request, res: express.Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Criar um usuário de teste
    const user = userRepository.create({
      name: "Usuário Teste",
      email: `teste${Date.now()}@example.com`,
      password: "senha123",
      role: "client"
    });
    
    await userRepository.save(user);
    return res.status(201).json({ message: "Usuário de teste criado com sucesso", user });
  } catch (error: any) {
    console.error("Erro ao criar usuário de teste:", error);
    return res.status(500).json({ 
      message: "Erro ao criar usuário de teste",
      error: error.message 
    });
  }
});

//rotas de autenticação
app.use('/api/auth', authRoutes);

// Inicialização do DataSource e Express
const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com banco de dados estabelecida com sucesso");
    
    // Inicia o servidor apenas após a conexão com o banco
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

export default app;