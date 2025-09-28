import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home/Home";
import About from "@/pages/Home/About";
import Features from "@/pages/Home/Features";
import Pricing from "@/pages/Home/Pricing";
import Contact from "@/pages/Home/Contact";
import Faq from "@/pages/Home/Faq";
import Register from "@/pages/auth/Register";

import { dashboardRoutes } from "./dashboardRoutes";
import Login from "@/pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "features", element: <Features /> },
      { path: "pricing", element: <Pricing /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <Faq /> },
      { path: "login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      dashboardRoutes, 
    ],
  },
]);
