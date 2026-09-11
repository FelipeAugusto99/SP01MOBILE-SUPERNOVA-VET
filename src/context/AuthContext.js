import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    function login(username, password) {
        setUsuario({
            username,
            password,
        });
    }

    function logout() {
        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}