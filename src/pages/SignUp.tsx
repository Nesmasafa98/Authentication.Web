import AuthLayout from '../layouts/AuthLayout';

const SignUp = () => {
  return (
    <AuthLayout title="Create an Account">
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Create a password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
