import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-brand-card rounded-2xl border border-brand-border shadow-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
