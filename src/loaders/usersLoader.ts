import axiosInstance from '../services/axiosService';

export const usersLoader = async () => {
	try {
		const res = await axiosInstance.get('/users');
		return res.data.data;
	} catch (error) {
		console.error('Failed to load users:', error);
		return [];
	}
};
