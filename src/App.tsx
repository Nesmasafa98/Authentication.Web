import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/Error';
import { usersLoader } from './loaders/usersLoader';
import { signInAction } from './actions/signIn';
import { signUpAction } from './actions/signUp';

const router = createBrowserRouter([
	{
		path: '/',
		element: <SignIn />,
		errorElement: <ErrorPage />
	},
	{
		path: '/signin',
		element: <SignIn />,
		action: signInAction
	},
	{
		path: '/signup',
		element: <SignUp />,
		action: signUpAction
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
		loader: usersLoader,
		errorElement: <ErrorPage />
	}
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;

