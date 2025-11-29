import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import {
  LandingPage,
  LoginPage,
  SignupPage,
  DashboardHome,
  ProjectsPage,
  BoardPage,
  CalendarPage,
  TeamPage,
  SettingsPage,
} from "@/pages";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },

  // Dashboard routes (protected - will add auth later)
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:projectId/board",
        element: <BoardPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "team",
        element: <TeamPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
