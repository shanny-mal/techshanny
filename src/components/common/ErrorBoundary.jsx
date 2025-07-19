import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // You could also send errors to Sentry/LogRocket etc.
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <svg
              className="w-24 h-24 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            </svg>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-md">
            An unexpected error has occurred. You can try reloading, return
            home, or report this issue so we can fix it.
          </p>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow transition"
            >
              Reload
            </button>
            <Link
              to="/"
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow transition"
            >
              Go Home
            </Link>
          </div>

          <a
            href="https://github.com/your-repo/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-600 hover:underline"
          >
            Report this issue
          </a>

          {this.state.error && (
            <details className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner text-left overflow-auto max-h-48 w-full max-w-lg">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                View technical details
              </summary>
              <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.info?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
