import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokenService } from '../services/tokenService';

interface AuthContextType {
	isAuthenticated: boolean;
	signin: (user: unknown, accessToken: string, refreshToken: string) => void;
	signup: (user: unknown, accessToken: string, refreshToken: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(tokenService.isAuthenticated());

	useEffect(() => {
		setIsAuthenticated(tokenService.isAuthenticated());
	}, []);

	const signin = (user: unknown, accessToken: string, refreshToken: string) => {
		tokenService.setAccessToken(accessToken);
		tokenService.setRefreshToken(refreshToken);
		tokenService.setCurrentUser(user);
		setIsAuthenticated(true);
	};

	const signup = (user: unknown, accessToken: string, refreshToken: string) => {
		tokenService.setAccessToken(accessToken);
		tokenService.setRefreshToken(refreshToken);
		tokenService.setCurrentUser(user);
		setIsAuthenticated(true);
	};

	const logout = () => {
		tokenService.clearTokens();
		setIsAuthenticated(false);
	};

	return <AuthContext.Provider value={{ isAuthenticated, signin, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)!;

export default AuthProvider;
