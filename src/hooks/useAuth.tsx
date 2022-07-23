import React, {useState, useContext, createContext, useEffect} from 'react';
import api from "../utils/axiosInterceptors";

interface IAuthContext {
    user: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAuthChecking: boolean
    error: any;
    loginUser: Function,
    registerUser: Function,
    logout: Function,
}

interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

interface LoginInput {
    username: string;
    password: string;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthProvide = () => {
    const [error, setError] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [isAuthChecking, setIsAuthChecking] = useState<boolean>(false)
    const [user, setUser] = useState<string | null>(null);

    const registerUser = async (userInput: RegisterInput, navigate: Function) => {
        try {
            setError(false)
            setLoading(true)
            await api.post(`/users/signup`, userInput)
            setLoading(false)
            navigate()
        } catch (e: any) {
            setError(e?.response?.status)
            setLoading(false)
        }


    };

    const loginUser = async (data: LoginInput, navigate: Function) => {
        try {
            setError(false)
            setLoading(true)
            const { username, password } = data;
            const response = await api.post('/users/login', {username, password})
            localStorage.setItem('accessToken', response.data.accessToken)
            setUser(response.data.username)
            setAuthenticated(true)
            setLoading(false)
            navigate()
        }
        catch (e: any) {
            console.log(e.response)
            setError(e?.response?.status)
            setLoading(false)
        }
    }

    const logout = async (cb: Function) => {
        setIsAuthChecking(true);
        await api.get('/users/logout');
        localStorage.removeItem('accessToken');
        setAuthenticated(false);
        setUser(null);
        setIsAuthChecking(false);
        cb()
    };

    useEffect(()=> {
        async function checkUser () {
            setIsAuthChecking(true)
            const token = localStorage.getItem('accessToken')
            if (!token) {
                setAuthenticated(false)
                return setIsAuthChecking(false)
            }
            try {
                const response = await api.get('/users/getUser')
                setUser(response.data.username);
                setAuthenticated(true);
                setIsAuthChecking(false);
            } catch(e) {
                localStorage.removeItem('accessToken');
                setIsAuthChecking(false);
                }
            }
        checkUser()
    }, [])
    return {
        loginUser,
        registerUser,
        logout,
        user,
        isLoading,
        isAuthenticated,
        isAuthChecking,
        error
    }
}

export function AuthProvider({ children }: any) {
const auth = useAuthProvide()
return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}


export default function useAuth() {
    return useContext(AuthContext);
}