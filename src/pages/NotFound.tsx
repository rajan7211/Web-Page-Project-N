import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-84px)] flex items-center justify-center bg-slate-100 px-4 py-16">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">404 error</p>
        <h1 className="mt-6 text-5xl font-semibold text-slate-950">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The page you are looking for does not exist. Use the button below to return to the homepage.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}


