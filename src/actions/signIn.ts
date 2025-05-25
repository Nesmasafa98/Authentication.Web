import { authService } from '../services/authService';

export const signInAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as { email: string; password: string };
	if (!data.email || !data.password) {
		return { error: 'Please fill in all fields.' };
	}

	const result = await authService.signIn(data);

	if (result.error) {
		return { error: result.error };
	}

	return result.data;
};
