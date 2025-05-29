// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardClient from "./pages/DashboardClient";
import DashboardProfessional from "./pages/DashboardProfessional";
import RequireAuth from "./components/Auth/RequireAuth";
import { UserRole } from "./types/userTypes";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />, // App componente com <Outlet /> para renderizar rotas filhas
    children: [
      {
        index: true, // Rota padrão para "/"
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard-admin",
        element: (
          <RequireAuth allowedRoles={[UserRole.ADMIN]}>
            <DashboardAdmin />
          </RequireAuth>
        ),
      },
      {
        // Corrigido o typo de "//dashboard-client" para "/dashboard-client"
        path: "dashboard-client",
        element: (
          <RequireAuth allowedRoles={[UserRole.CLIENT]}> 
            {/* Ou apenas [UserRole.CLIENT] se só clientes podem ver */}
            <DashboardClient />
          </RequireAuth>
        ),
      },
      {
        // Corrigido o typo de "//dashboard-professional" para "/dashboard-professional"
        path: "dashboard-professional",
        element: (
          <RequireAuth allowedRoles={[UserRole.PROFESSIONAL]}>
            {/* Ou apenas [UserRole.PROFESSIONAL] se só profissionais podem ver */}
            <DashboardProfessional />
          </RequireAuth>
        ),
      },
      // Adicione uma rota para "Não Autorizado" se desejar, ou trate no RequireAuth
      // { path: "unauthorized", element: <div>Você não tem permissão para acessar esta página.</div>}
    ],
  },
  // Rota catch-all para páginas não encontradas (opcional, mas bom ter)
  // Se App for o elemento raiz para tudo, esta rota pode ficar dentro de children também
  // ou como uma rota de nível superior separada se App não for para 404.
  // Por simplicidade, vamos omitir por agora, mas considere adicionar.
];

const router = createBrowserRouter(routesConfig);

export default router;