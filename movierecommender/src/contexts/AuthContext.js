import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setToken(storedToken);
                    setDecodedToken(decodedToken);
                    setIsValid(true);
                    console.log(decodedToken)
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Error decoding JWT:', error);
                localStorage.removeItem('jwtToken');
            }
        }
        setLoading(false);
    }, []);

    const signOut = () => { // Add this function
        localStorage.removeItem('token');
        setToken(null);
        setDecodedToken(null);
        setIsValid(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ token, decodedToken, isValid, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
