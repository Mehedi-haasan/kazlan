import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-5 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
