const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA = 'user_data';

export const tokenService = {
	getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
	setAccessToken: (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
	removeAccessToken: () => localStorage.removeItem(ACCESS_TOKEN_KEY),

	getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
	setRefreshToken: (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token),
	removeRefreshToken: () => localStorage.removeItem(REFRESH_TOKEN_KEY),

	getCurrentUser: () => localStorage.getItem(USER_DATA),
	setCurrentUser: (user: unknown) => localStorage.setItem(USER_DATA, JSON.stringify(user)),
	removeCurrentUser: () => localStorage.removeItem(USER_DATA),

	clearTokens: () => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		localStorage.removeItem(USER_DATA);
	},

	isAuthenticated: () => !!localStorage.getItem(ACCESS_TOKEN_KEY)
};
