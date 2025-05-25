/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { tokenService } from './tokenService';

let isRefreshing = false;
let failedQueue: any[] = [];
const WHITELIST = ['/auth/signin', '/auth/signup', '/auth/logout'];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = tokenService.getAccessToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (WHITELIST.includes(originalRequest.url)) {
			return Promise.reject(error);
		}

		// If token expired
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = 'Bearer ' + token;
						return axiosInstance(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const refreshToken = tokenService.getRefreshToken();

			try {
				const { data } = await axios.post('http://localhost:3000/api/auth/refresh', {
					refreshToken
				});

				const newAccessToken = data.data.accessToken;
				tokenService.setAccessToken(newAccessToken);

				const newRefreshToken = data.data.refreshToken;
				tokenService.setRefreshToken(newRefreshToken);

				axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

				processQueue(null, newAccessToken);

				return axiosInstance(originalRequest);
			} catch (err) {
				processQueue(err, null);
				tokenService.clearTokens();
				window.location.href = '/signin';
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
