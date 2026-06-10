import { createBrowserRouter } from "react-router";
import Portfolio from "./pages/Portfolio";
import ProjectAdmin from "./pages/ProjectAdmin";

export const router = createBrowserRouter([
  { path: "/", Component: Portfolio },
  { path: "/kdj", Component: ProjectAdmin },
]);
