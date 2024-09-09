import Dashboard from "./components/dashboard/Dashboard";
import { AuthenticatedRedirect, ProtectedRoute } from "./components/middleweres/authentication";
import { Login } from "./pages";

export const routes = [
    {
        path: '/',
        component:<ProtectedRoute> <Dashboard /> </ProtectedRoute>
    },
    {
        path: '/login',
        component:<AuthenticatedRedirect><Login /></AuthenticatedRedirect>
    },
]
