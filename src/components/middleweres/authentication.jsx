import { Navigate } from 'react-router-dom';

function isAuthenticated() {
    const cookies = document.cookie.split(';').reduce((cookies, item) => {
        const [name, value] = item.split('=');
        cookies[name.trim()] = value;
        return cookies;
    }, {});
    return !!cookies.jwt; // Devuelve true si la cookie 'jwt' está presente
}

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};

const AuthenticatedRedirect = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/" />;
    }
    return children;
};

export {AuthenticatedRedirect, ProtectedRoute};
