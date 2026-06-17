import { useNavigate } from 'react-router';

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-brand-card p-8 rounded-2xl border border-brand-border text-center shadow-xl">
        <h2 className="text-4xl font-extrabold text-red-500 mb-2">403</h2>
        <h3 className="text-xl font-bold mb-4">Access Forbidden</h3>
        <p className="text-zinc-500 text-sm mb-6">
          You do not have the required permissions to view this resource. Please contact your system administrator.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
