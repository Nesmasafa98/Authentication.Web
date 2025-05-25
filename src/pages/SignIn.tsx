import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'submitting';
	const [error, setError] = useState<string | null>(null);

	const actionData = useActionData() as
		| { error?: string }
		| { user: never; accessToken: string; refreshToken: string }
		| null;

	const { signin } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (actionData) {
			if ('accessToken' in actionData && actionData.user) {
				signin(actionData.user, actionData.accessToken, actionData.refreshToken);
				navigate('/dashboard');
			} else if ('error' in actionData && actionData.error) {
				setError(actionData.error);
			}
		}
	}, [actionData, signin, navigate]);

	return (
		<AuthLayout title="Welcome Back">
			<Form method="post" noValidate>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Email</label>
					<input
						type="email"
						name="email"
						className="w-full border px-3 py-2 rounded"
						placeholder="john.doe@example.com"
					/>
				</div>
				<div className="mb-6">
					<label className="block text-sm font-medium mb-1">Password</label>
					<input
						type="password"
						name="password"
						className="w-full border px-3 py-2 rounded"
						placeholder="••••••••"
					/>
				</div>

				{error && <div className="mb-4 text-sm text-red-600">{error}</div>}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
					Sign In
				</button>
			</Form>
		</AuthLayout>
	);
};

export default SignIn;
