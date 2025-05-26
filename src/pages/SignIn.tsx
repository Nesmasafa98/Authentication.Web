import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
		<AuthLayout title="Sign in">
			<Form method="post" noValidate>
				<div className="mb-4">
					<label className="block text-sm font-light mb-2">Email</label>
					<input
						type="email"
						name="email"
						className="w-full border border-gray-400 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-0"
						placeholder="john.doe@example.com"
					/>
				</div>
				<div className="mb-6">
					<label className="block text-sm font-light mb-2 text-md">Password</label>
					<input
						type="password"
						name="password"
						className="w-full border border-gray-400 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-0"
						placeholder="••••••••"
					/>
				</div>

				{error && <div className="mb-4 text-sm text-red-600">{error}</div>}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-[#fb794c] text-white py-2 rounded hover:bg-[#fb784cdb] transition font-medium">
					Sign In
				</button>
			</Form>
			<div className="flex items-center text-sm mt-8">
				<p className="mr-2 text-gray-600">Don't have an account?</p>
				<Link to="/signup" className="hover:underline">
					Sign Up
				</Link>
			</div>
		</AuthLayout>
	);
};

export default SignIn;
