import React from 'react';
import notfoundimg from '../assets/image.png';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
    <div>  <img
        src={notfoundimg}
        alt="404 Not Found"
        className="w-full h-auto mb-6"
      /></div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
}

export default NotFound;
