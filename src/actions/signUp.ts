import { authService } from '../services/authService';

export const signUpAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as {
		email: string;
		name: string;
		password: string;
	};

	if (!data.email || !data.name || !data.password) {
		return { error: 'All fields are required' };
	}

	const result = await authService.signUp(data);

	if (result.error) {
		return { error: result.error };
	}

	return result.data;
};
