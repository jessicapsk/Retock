import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { User } from "./models/User";
import bcrypt from 'bcryptjs'; 

// Configuração de ambiente
dotenv.config();

// Inicializa Express
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Use a variável de ambiente ou um padrão
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
  res.send('API Retock Funcionando!');
});

// Rotas de autenticação
app.use('/api/auth', authRoutes);
// Rotas de usuário
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Função para criar usuários padrão (seeding)
const seedDatabase = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const usersToSeed = [
    {
      name: "Admin Retock",
      email: "admin@retock.com",
      password: "AdminPassword1!", // Senha forte para o admin
      role: "admin",
      isActive: true,
      phone: "00000000000" // Telefone fictício ou pode ser null
    },
    {
      name: "Professional Retock",
      email: "professional@retock.com",
      password: "ProfPassword1!", // Senha forte para o profissional
      role: "professional",
      isActive: true,
      phone: "11111111111" // Telefone fictício ou pode ser null
    }
  ];

  for (const userData of usersToSeed) {
    const existingUser = await userRepository.findOne({ where: { email: userData.email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      await userRepository.save(newUser);
      console.log(`Usuário padrão '${userData.email}' criado.`);
    } else {
      console.log(`Usuário padrão '${userData.email}' já existe.`);
    }
  }
};

// Inicialização do TypeORM e do servidor
AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    await AppDataSource.synchronize(false);
    console.log('Banco de dados sincronizado (schema atualizado).');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor backend rodando na porta ${PORT}`);
    });
  })
  .catch((err: Error) => { // Adicionado tipo para err
    console.error("Erro durante a inicialização do Data Source:", err);
  });

  export default app;