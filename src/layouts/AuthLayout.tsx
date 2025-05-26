import type { ReactNode } from 'react';

type AuthLayoutProps = {
	children: ReactNode;
	title: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
	return (
		<div className=" min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
				<h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
