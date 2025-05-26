import AuthLayout from '../layouts/AuthLayout';
import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
					<label className="block text-sm font-light mb-2 text-md">Email</label>
					<input
						type="email"
						className="w-full border border-gray-400 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-0"
						placeholder="john.doe@example.com"
						name="email"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-light mb-2 text-md">Name</label>
					<input
						type="text"
						name="name"
						className="w-full border border-gray-400 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-0"
						placeholder="John Doe"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-light mb-2 text-md">Password</label>
					<input
						type="password"
						name="password"
						className="w-full border border-gray-400 px-3 py-2 rounded bg-transparent focus:outline-none focus:ring-0"
						placeholder="Create a password"
					/>
				</div>

				{error && <div className="mb-4 text-sm text-red-600">{error}</div>}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-[#fb794c] text-white py-2 rounded hover:bg-[#fb784cdb] transition font-medium">
					Sign Up
				</button>
			</Form>
			<div className="flex items-center text-sm mt-8">
				<p className="mr-2 text-gray-600">Already have an account?</p>
				<Link to="/signin" className="mr-4 hover:underline">
					Sign In
				</Link>
			</div>
		</AuthLayout>
	);
};

export default SignUp;
