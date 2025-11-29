import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import {
  LandingPage,
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  AcceptInvitePage,
  DashboardHome,
  SpacesPage,
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

  // Auth routes
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/accept-invite",
    element: <AcceptInvitePage />,
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
        path: "spaces",
        element: <SpacesPage />,
      },
      {
        path: "spaces/:spaceId",
        element: <ProjectsPage />,
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
