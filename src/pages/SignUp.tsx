import AuthLayout from '../layouts/AuthLayout';
import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const SignUp = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'submitting';
	const [error, setError] = useState<string | null>(null);

	const actionData = useActionData() as
		| { error?: string }
		| { user: never; accessToken: string; refreshToken: string }
		| null;

	const { signup } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (actionData) {
			if ('accessToken' in actionData && actionData.user) {
				signup(actionData.user, actionData.accessToken, actionData.refreshToken);
				navigate('/dashboard');
			} else if ('error' in actionData && actionData.error) {
				setError(actionData.error);
			}
		}
	}, [actionData, signup, navigate]);

	return (
		<AuthLayout title="Create an Account">
			<Form method="post" noValidate>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Email</label>
					<input
						type="email"
						className="w-full border px-3 py-2 rounded"
						placeholder="john.doe@example.com"
						name="email"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Name</label>
					<input type="text" name="name" className="w-full border px-3 py-2 rounded" placeholder="John Doe" />
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Password</label>
					<input
						type="password"
						name="password"
						className="w-full border px-3 py-2 rounded"
						placeholder="Create a password"
					/>
				</div>

				{error && <div className="mb-4 text-sm text-red-600">{error}</div>}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
					Sign Up
				</button>
			</Form>
		</AuthLayout>
	);
};

export default SignUp;
