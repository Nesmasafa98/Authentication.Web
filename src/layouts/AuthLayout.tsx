import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        {children}
        <div className="mt-6 text-center text-sm text-gray-500">
          <Link to="/signin" className="mr-4 hover:underline">
            Sign In
          </Link>
          <Link to="/signup" className="hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
