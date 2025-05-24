// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
//import { RegisterPage } from "./pages/Registerpage";
//import DashboardAdmin from "./pages/DashboardAdmin";
//import DashboardClient from "./pages/DashboardClient";
//import DashboardProfessional from "./pages/DashboardProfessional";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    //element: <RegisterPage />,
  },
  {
    path: "/admin",
    //element: <DashboardAdmin />,
  },
  {
    path: "/client",
    //element: <DashboardClient />,
  },
  {
    path: "/professional",
    //element: <DashboardProfessional />,
  },
]);

export default router;