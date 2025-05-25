/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import axiosInstance from './axiosService';

interface SignInRequest {
	email: string;
	password: string;
}

interface SignUpRequest {
	email: string;
	name: string;
	password: string;
}

interface TokenResponse {
	data?: unknown;
	error?: string;
}

export const authService = {
	signUp: async (data: SignUpRequest): Promise<TokenResponse> => {
		try {
			const response = await axiosInstance.post('/auth/signup', data);
			return { data: response.data.data };
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return {
					error: error.response?.data?.message || 'Something went wrong'
				};
			}
			return { error: 'Failed to sign up. Please try again.' };
		}
	},
	signIn: async (data: SignInRequest): Promise<TokenResponse> => {
		try {
			const response = await axiosInstance.post('/auth/signin', data);
			return { data: response.data.data };
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return { error: error.response?.data?.message || 'Something went wrong' };
			}
			return { error: 'Failed to sign in. Please try again.' };
		}
	},
	logout: async () => {
		try {
			await axiosInstance.post('/auth/logout', {});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Logout error:', error.response?.data);
			}

			return { error: 'Failed to sign in. Please try again.' };
		}
	}
};
