import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const Dashboard = () => {
	const users = useLoaderData() as { id: string; name: string; email: string }[];
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await authService.logout();
			logout();
			navigate('/signin');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// show a toast or alert here
			console.error('Logout failed:', error);

			// no action if its due to network error
			if (!error?.response) return;

			logout();
			navigate('/signin');
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow px-4 py-3 flex justify-between items-center">
				<h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
					Logout
				</button>
			</header>

			<main className="p-4">
				<p className="text-gray-600">Welcome to your dashboard.</p>
				<ul className="space-y-2">
					{users.map((user) => (
						<li key={user.id} className="bg-white p-4 shadow rounded border border-gray-100">
							<p className="text-gray-800 font-medium">{user.name}</p>
							<p className="text-gray-500 text-sm">{user.email}</p>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
};

export default Dashboard;
