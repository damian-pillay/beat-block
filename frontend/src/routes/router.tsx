import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import Home from "../pages/Home/Home";
import ProjectEditor from "../pages/ProjectEditor/ProjectEditor";

const rootRoute = createRootRoute({
  component: () => {
    return <Outlet />;
  },
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: ProjectEditor,
});

const routeTree = rootRoute.addChildren([homeRoute, editorRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
