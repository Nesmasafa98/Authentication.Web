import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();

	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: error instanceof Error
		? error.message
		: 'Something went wrong';

	return (
		<div className="min-h-screen flex items-center justify-center text-center p-4">
			<div>
				<h1 className="text-2xl font-bold text-red-600 mb-2">Oops!</h1>
				<p className="text-gray-700">{message}</p>
			</div>
		</div>
	);
};

export default ErrorPage;
