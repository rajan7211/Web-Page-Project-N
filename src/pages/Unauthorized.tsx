import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-84px)] flex items-center justify-center bg-slate-100 px-4 py-16">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <FiAlertTriangle className="h-10 w-10" />
        </div>
        <h1 className="mt-8 text-4xl font-semibold text-slate-950">Unauthorized</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          You do not have permission to access this page. Please sign in with an authorized
          account.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}



